FROM mongo

COPY mongo.sh /mongo.sh
RUN chmod 777 /mongo.sh

COPY dump /dump

ENTRYPOINT /mongo.sh
