# Copyright 2019
# Code written by Ian McDowell
from pymongo import MongoClient
import docx

# sets up connection with local database
client = MongoClient('localhost:27017')
db = client.ruskin
letPath = "RCL1_49.docx"

contents = []
dates = []
authors = []
addressees = []

letNum = 1
lineNum = 1
doc = docx.Document(letPath)
for i in doc.paragraphs:
	if str(letNum) + ". " in i.text:
		temp = str(i.text).split('. ')[1].split(" to ")
		authors.append(temp[0])
		addressees.append(temp[1])
		contents.append("")
		letNum = letNum + 1
		lineNum = 2
	elif letNum != 1:
		if lineNum == 2:
#			dates.append(str(i.text).split(', ', 1)[1])
			lineNum = 1
		else:
			contents[letNum-2] += str(i.text) + '\n'

letNum = 1
for content in contents:
	letter = {
			'_id' : letNum,
			'date' : "dates[letNum-1]",
			'author' : authors[letNum-1],
			'addressee' : addressees[letNum-1],
			'letter_num' : letNum,
			'content' : content
		}
	result = db.letters.insert_one(letter)
	print('Created '+str(letNum)+' of '+str(len(contents))+' as {1}'.format(letNum,result.inserted_id))
	letNum += 1
