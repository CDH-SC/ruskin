# Copyright 2019
# Code written by Ian McDowell
from pymongo import MongoClient
import docx
import re
import os

# sets up connection with local database
client = MongoClient('localhost:27017')
db = client.ruskin

dirList = sorted(os.listdir('.'))
for kDir in dirList:
	if ".html" not in kDir:
		dirList.remove(kDir)
print('Adding the following letters to the database:')
print(dirList)

from html.parser import HTMLParser
from bs4 import BeautifulSoup

soup = BeautifulSoup(A1_49.html, 'html.parser')

class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        print("Encountered a start tag:", tag)

    def handle_endtag(self, tag):
        print("Encountered an end tag :", tag)

    def handle_data(self, data):
        print("Encountered some data  :", data)

parser = MyHTMLParser()
parser.feed(soup.prettify())

# contents = []
# dates = []
# authors = []
# addressees = []

# letNum = 1
# lineNum = 1

# for file in dirList:
# 	doc = docx.Document(file)
# 	print("\n" + file + ":")
# 	for i in doc.paragraphs:
# 		if str(letNum) + ". " in str(i.text):
# 			temp = str(i.text).split('. ', 1)[1].split(" to ")
# 			authors.append(temp[0])
# 			addressees.append(temp[1])
# 			contents.append("")
# 			# print(str(i.text))
# 			# print(str(letNum) + " " + str(i.text))
# 			letNum = letNum + 1
# 			lineNum = 2
# 		elif letNum != 1:
# 			if bool(re.findall("‘[0-9][0-9]", str(i.text)) or bool(re.findall("18[0-9][0-9]", str(i.text)))):
# 				if "Chelsea," in str(i.text) or "Lucerne," in str(i.text) or "Carlyle to Ruskin," in str(i.text):
# 					dates.append(str(i.text).split(", ", 1)[1])
# 				else:
# 					dates.append(str(i.text))
# 				# print(str(i.text) + "\n" + str(len(dates)) + "\t" + str(letNum-1))
# 				lineNum = 1
# 			else:
# 				contents[letNum-2] += str(i.text) + '\n'

# #50s, 60s, 70s

# letNum = 1
# currYear = 0
# prevYear = currYear
# fifties = []
# sixties = []
# seventies = []
# letters = []

# for content in contents:
# 	if "‘" in dates[letNum-1]:
# 		currYear = int("18" + re.findall("‘[0-9][0-9]", dates[letNum-1])[0].split("‘")[1])
# 	else:
# 		currYear = int(re.findall("18[0-9][0-9]", dates[letNum-1])[0])

# 	if (prevYear < currYear and prevYear != 0):
# 		year = {
# 			 'year' : prevYear,
# 			 'letters' : letters
# 			}
# 		if prevYear > 1849 and prevYear < 1860:
# 			fifties.append(year)
# 		elif prevYear > 1859 and prevYear < 1870:
# 			sixties.append(year)
# 		elif prevYear > 1869 and prevYear < 1880:
# 			seventies.append(year)
# 		letters = []

# 	prevYear = currYear

# 	letter = {
# 		'date' : dates[letNum-1],
# 		'author' : authors[letNum-1],
# 		'addressee' : addressees[letNum-1],
# 		'letter_num' : letNum,
# 		'content' : content
# 	}
# 	# print(str(currYear) + "\t" + str(letNum))
# 	letters.append(letter)

# 	letNum += 1

# year = {
# 	 'year' : prevYear,
# 	 'letters' : letters
# 	}
# if prevYear > 1849 and prevYear < 1860:
# 	fifties.append(year)
# elif prevYear > 1859 and prevYear < 1870:
# 	sixties.append(year)
# elif prevYear > 1869 and prevYear < 1880:
# 	seventies.append(year)

# decade = {
# 	'_id' : "1850s",
# 	'years' : fifties
# }
# result = db.letters.insert_one(decade)
# print('Created 1 of 3 as {1}'.format(1,result.inserted_id))

# decade = {
# 	'_id' : "1860s",
# 	'years' : sixties
# }
# result = db.letters.insert_one(decade)
# print('Created 2 of 3 as {1}'.format(2,result.inserted_id))

# decade = {
# 	'_id' : "1870s",
# 	'years' : seventies
# }
# result = db.letters.insert_one(decade)
# print('Created 3 of 3 as {1}'.format(3,result.inserted_id))