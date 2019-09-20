# Copyright 2019
# Code written by Ian McDowell
from pymongo import MongoClient
import os

# sets up connection with local database
client = MongoClient('localhost:27017')
db = client.admin

# gets list of directories
dirList = sorted(os.listdir('.'))
for kDir in dirList:
	if '.' in kDir:
		dirList.remove(kDir)
print('Adding the following volumes to the database:')
print(dirList)

# adds diaries to the database
idNum = 1
for kDir in dirList:
	# gets the volume number
	volNum = kDir.replace('RF_MS_','')

	# converts image file names into the object format for mongo
	rawImageList = sorted(os.listdir(kDir))
	if rawImageList[len(rawImageList)-1] == 'Thumbs.db':
		rawImageList.remove('Thumbs.db')
	objectImageList = []
	for image in rawImageList:
		obImage = {
			'image' : image
		}
		objectImageList.append(obImage)

	# puts everything into a diary object
	diary = {
		'_id' : volNum,
		'date' : '[date]'+str(volNum),
		'notebook_url' : 'assets/images/'+kDir+"/",
		'volume_num' : volNum,
		'ms_num' : '[ms_num]'+str(volNum),
		'page' : objectImageList
	}

	# inserts diary into the database
	result = db.diaries.insert_one(diary)

	# notifies user of progress and increments the idNum counter
	print('Created '+str(idNum)+' of '+str(len(dirList))+' as {1}'.format(idNum,result.inserted_id))
	idNum = idNum + 1

# notifies user of the completion of all imports
print('Successfully imported '+str(len(dirList))+' volumes into the database!')