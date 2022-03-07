#### 链接docker中的Postgres

```bash
// Mac
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

// Windows
docker run -v $PWD\blog-data:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

#### 进入数据库
```bash
docker exec -it <containerId> bash
psql -U blog
```
