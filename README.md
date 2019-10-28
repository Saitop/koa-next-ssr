### CBS A/B Test Management

### to run local
 `docker-compose up`
 
### to stop local
`docker-compose stop && docker-compose down`

remove volume:

`docker volume ls -q -f 'dangling=true' | xargs docker volume rm`

