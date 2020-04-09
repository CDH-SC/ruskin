#!/usr/bin/env python3

"""
Volume Upload Script

Given a directory of XML files it will parse each file
and format it into usable html before uploading each volume
to the MongoDB database
"""

# standard library imports
import re
import os
import json
from datetime import datetime

# 3rd party package imports
from lxml import etree
from pymongo import MongoClient
from bs4 import BeautifulSoup as bs

# start timing of script
startTime = datetime.now()
# set working directory for XML files
directory = '../ruskin-archive/'

# connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client.ruskin

# load XSLT stylesheet
xsltDoc = etree.parse('xml_styling.xslt')
xsltTransformer = etree.XSLT(xsltDoc)


def xsltFormat(inputString):
    """ Apply XSLT styling to input XML """

    sourceDoc = etree.fromstring(inputString)
    formattedDoc = str(xsltTransformer(sourceDoc))

    return formattedDoc


def letterUpload(array):
    """ Parse and upload given letters """

    print ('%d letters found' % len(array))
    letterArray = []

    for l in array:
        xml_id = l.bibl['xml:id']
        docDate = l.docDate['value']
        humanDate = ''.join(l.docDate.strings)

        letterNumber = l.select('idno[type="letternumber"]')[0].string

        if l.docAuthor:
            docAuthor = ' '.join(l.docAuthor.stripped_strings)
        else: docAuthor = None

        if l.select('person[type="sender"]'):
            sender = l.select('person[type="sender"]')[0].string
        else: sender = None

        if l.select('person[type="addressee"]'):
            recipient = l.select('person[type="addressee"]')[0].string
        else: recipient = None

        if l.sourceNote.contents:
            sourceNote = xsltFormat(''.join(map(str, l.sourceNote.contents)))
        else: sourceNote = None

        docBody = xsltFormat(str(l.docBody))
        
        """ There are currently no footnotes, uncomment this block if they are added later
        footnotesArray = l.find_all('note')
        if footnotesArray:
            footnotes = footnoteFormat(footnotesArray)
        else: footnotes = None
        """

        letter = {
            'xml_id': xml_id,
            'docDate': docDate,
            'letterNumber': letterNumber,
            'docAuthor': docAuthor,
            'sender': sender,
            'recipient': recipient,
            'sourceNote': sourceNote,
            'docBody': docBody,
            # uncomment line below if footnotes are eventually added
            # 'footnotes': footnotes,
        }
        letterArray.append(letter)

        try:
            db.letters.update_many(
                {'_id': 'letter'},
                {'$set': {'letters': letterArray}}, upsert=True
            )
            print('letters successfully uploaded\n')
        except Exception as e: print(e)


    def main():
        # loop through XML files in directory
        dirList = os.listdir(directory)
        dirList.sort()
        for i, filename in enumerate(dirList, start=1):
            if filename.endswith('.xml'):
                file = open(os.path.join(directory, filename), 'r')
                content = file.read()
                bs_content = bs(content, 'xml')

                # get all letters in XML file
                letterSections = bs_content.find_all('div2')
                if letterSections[0]:
                    letters = letterSections[0].find_all('div3')
                    letterUpload(letters, 'letters', volumeID)


if __name__ == '__main__':
    main()
    print(datetime.now() - startTime)