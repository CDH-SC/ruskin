#!/usr/bin/python

# Volume Upload Script
#
# @author Lawton C Mizell
# Contact: alcamech@gmail.com
#
# This is a volume upload script that will loop through the ../ruskin-archive/ directory
# and its xHTML files ( HTML encoded with a TEI XSLT Stylesheet). It will automate the notebook upload process by pulling the
# appropiate diary entries enclosed by fw clas and div.
#
# It uses regex, file operations, and some filtering.
#
# This script only works if the data within the xHTML files are CORRECT and CONSISTENT

import os
import sys
import re
from pymongo import MongoClient
from datetime import datetime # measure the speed of script
from pprint import pprint # pprint library is used to make the output look pretty

startTime = datetime.now()
directory = "../ruskin-archive/"

#connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient('mongodb://localhost:27017/')
ruskin_db = client.ruskin # db

# Issue the serverStatus command and print the results to check server status
# uncomment two lines below
#
# serverStatusResult=db.command("serverStatus")
# pprint(serverStatusResult)

#############################
# Uploads the processed     #
# pages from a xHTML file #
# into mongodb.             #
#############################
def upload_volume(pageArray, notebookID):
    ruskin_db.diaries.update_one(
    {"_id":notebookID},
    {
    "$set": {
    "page":pageArray,
     }
    })

###################################
# iterates through a xHTML file   #
# and parses associated data for  #
# each page.                      #
###################################
def main():
    # loop through files in ../ruskin-archive directory
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            notebook_id = int(filter(str.isdigit, filename)) #notebook id pulled from filename
            print filename
            file = open(os.path.join(directory, filename), "r")
            content = file.read()
            pageArray = []
            contentMatch = re.findall("<p class=\"fw\">(.*?)(?=<div.*</div>)", content, re.DOTALL) # each page is contained within the fw class and div.
            print "found... "+str(len(contentMatch))+" entries for the following notebook: "+filename
            print "processing... "+str(len(contentMatch))+" entries for the following notebook: "+filename

            try:
                # it will loop through each entry inside contentMatch and pull out the associated metadata
                for pageContent in contentMatch:
                    urlMatch = re.findall("(Add_.*?).jpg", pageContent, re.IGNORECASE)
                    urlMatch = urlMatch[0]+".jpg" # append .jpg back onto urlMatch
                    handMatch = re.findall("<p><span class=\"handShift\">(.*)<\/span></p>", pageContent)
                    metaDataMatch = re.findall("(Notebook.*?)<\/p>", pageContent, re.DOTALL)
                    metaDataMatch[0] = metaDataMatch[0].replace('\n', '')  # removes new line characters
                    # removes ampersand in header's
                    metaDataMatch[0] = metaDataMatch[0].replace('&amp;', ',')
                    # print metaDataMatch[0]
                    metaDataMatch[0] = " ".join(metaDataMatch[0].split())  # removes duplicated whitespace
                    metaDataMatch[0] = re.split(';', metaDataMatch[0])  # split up string by delimeter ;

                    # zeroth index contains notebook number and page number
                    notebookMetadata = re.split(',', metaDataMatch[0][0])
                    # first index contains volume number and manuscript number and folio number
                    volumeMetadata = re.split(',', metaDataMatch[0][1])
                    # second index is transcriber(s)
                    transcriber = str(metaDataMatch[0][2])
                    # third index is the image URL
                    imageUrl = metaDataMatch[0][3].lstrip()
                    # print imageUrl
                    if handMatch: # check if list is not empty, because apparently we have instances with no hand ?
                        hand = handMatch[0]
                    else:
                        hand = ''

                    notebookID = int(filter(str.isdigit, notebookMetadata[0]))  #notebookID pulled from metaData
                    pageNum = int(filter(str.isdigit, notebookMetadata[1]))

                    if len(volumeMetadata) == 3:
                        if "fol" in volumeMetadata[2]:
                            folioNum = re.split(' ', volumeMetadata[2].strip())[-1:][0] # split 4th index of metaData by spaces which should be folio number,
                            # then take last index of list e.g. ['fol.','121v']
                        else:
                            folioNum = ''
                    else:
                        folioNum = ''

                    #removes metadata from transcript
                    page = re.findall("<\/p>(.*?)$", pageContent, re.DOTALL)
                    page[0] = page[0].replace('\n', '')
                    page[0] = " ".join(page[0].split())


                    pageArray.append({"number":pageNum,
                    "folio_num": folioNum,
                    "image": imageUrl,
                    "content":page[0],
                    "transcriber": transcriber,
                    "hand": hand})

                    # remove the block comment below to output data for debugging purposes
                    # print notebookID
                    # print folioNum
                    # print transcriber
                    '''
                    print notebookID
                    print transcriber
                    print imageUrl
                    print folioNum
                    print hand
                    print pageContent
                    print urlMatch
                    print handMatch
                    print pageNum
                    for data in metaDataMatch[0]:
                        print data
                    print
                    '''

                # uploads pages to mongo client
                upload_volume(pageArray, str(notebook_id))
                # print pageArray
                # print "________________________________________________________"
                print "Records updated successfully!\n"
            except Exception as e:
                print str(e)

###################################
# calls the main function and     #
# prints the time it took to      #
# process a notebook              #
###################################
if __name__ == '__main__':
    main()
    print datetime.now() - startTime
