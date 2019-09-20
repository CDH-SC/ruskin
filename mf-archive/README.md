# Note
### Create an archive
cd to mf-archive: ```cd mf-archive```

create the archive (should exist): ```tar -cvf mf-archive.tar mField*```

### Update the database for all notebooks
Note: If the existing notebook already exist within the dump you do not need to extract the entire archive and run the script, you could simply run the script for the one new html file within mf-archive, add the file to the archive then remove the new html file once the record has been updated successfully. **See Update the database for a single notebook**

to use the archive to update the database do the following:

extract the archive: ```tar -xvf mf-archive.tar```

Make needed changes to the existing html files

cd to mf-utils : ```cd ../mf-utils```

run the script: ```python volume_upload_xHTML.py```

remove extracted files: ``` rm mField* ```

Make a mongodump and push it to the repo.

### Update the database for a single notebook
add new html file to mf-archive ```mv newfile.html mf-archive/```

cd to mf-utils: ```cd mf-utils```

run the script: ```python volume_upload_xHTML.py```

cd to mf-archive: ```cd mf-archive```

Update the tar.gz file ```tar -uvf mf-archive.tar.gz newfile.html```

Make a mongodump and push it to the repo.

### Add files to the archive
Update the tar.gz file: ```tar -uvf mf-archive.tar.gz newfile.html```
