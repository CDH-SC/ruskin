#!/usr/bin/env python3

# Copyright 2020
# Code written by Ian McDowell
# Contact: ianmcdowell24@gmail.com

""" Letters Upload Script
Given an xml file it will parse it and format 
it into usable html before uploading each letter
to the MongoDB database
 """


import re
import os
from datetime import datetime

# For XML parsing
from lxml import etree
from bs4 import BeautifulSoup as bs
# For uploading to Mongo
from pymongo import MongoClient

# starts the script timing
startTime = datetime.now()
# working directory
directory = '../ruskin-archive/'

# sets up connection with local database
client = MongoClient('localhost:27017')
db = client.ruskin


def XMLtoHTML(xml_input):
	"""Converts XML tags in input to HTML compatible tags."""
	i = 0
	bound = len(xml_input.find_all('hi'))
	while i < bound:
		xmlTag = xml_input.find('hi')
		identifier = xmlTag.text
		xmlString = str(xml_input.find('hi')).replace('<hi','<i').replace('hi>','i>')
		htmlTag = bs(xmlString,'lxml')
		xml_input.find('hi', text=identifier).replaceWith(htmlTag.i)
		i += 1

	return xml_input

def letterUpload(xml_ids,dates,id_nums,firstNames,lastNames,authors,
				senders,addressees,rawSourcenotes,rawDoc):
	"""Takes data parsed in main, sorts it into
	the appropriate structure, and uploads it to local db."""
	fifties = []
	sixties = []
	seventies = []
	letters = []
	prevYear = 0
	currYear = 0

	for i in range(len(xml_ids)):
		#Get letter field values
		xml_id = xml_ids[i]
		date_num = dates[i].get('value')
		date_verbose = dates[i].string
		letter_id = id_nums[i].string
		author = authors[i]
		sender = senders[i].string
		addressee = addressees[i].string
		HTML_sourcenotes = str(XMLtoHTML(rawSourcenotes[i]))
		HTML_doc = str(XMLtoHTML(rawDoc[i]))

		letter = {
			'_id': int(letter_id),
			'xml_id': xml_id,
			'docDate': date_num,
			'docDateString': date_verbose,
			'docAuthor': author,
			'sender': sender,
			'addressee': addressee,
			'sourceNote': HTML_sourcenotes,
			'docBody': HTML_doc
		}
		db.letters.insert_one(letter)

def main():
	filename = 'JRU-TC_XML-final1.xml'
	file = open(os.path.join(directory, filename), 'r')
	content = file.read()
	bs_content = bs(content, 'lxml')

	xml_ids = []
	root = etree.parse(os.path.join(directory, filename)).getroot()[0]
	for child in root:
		letter = child[0]
		xml_ids.append(letter.attrib['{http://www.w3.org/XML/1998/namespace}id'])

	dates = bs_content.find_all('docdate')
	id_nums = bs_content.find_all('idno')
	firstNames = bs_content.find_all(type='first')
	lastNames = bs_content.find_all(type='last')
	authors = []
	for i in range(len(firstNames)):
		authors.append(firstNames[i].string + ' ' + lastNames[i].string)

	senders = bs_content.find_all(type='sender')
	addressees = bs_content.find_all(type='addressee')
	sourcenotes = bs_content.find_all('sourcenote')
	rawDoc = bs_content.find_all('docbody')

	letterUpload(xml_ids,dates,id_nums,firstNames,lastNames,authors,
				senders,addressees,sourcenotes,rawDoc)
	

if __name__ == '__main__':
	main()
	# print script runtime
	print(datetime.now() - startTime)