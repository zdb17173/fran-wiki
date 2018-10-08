
# wiki

基于本地文件夹，扫描文件目录的wiki。


## config
修改配置fran-wiki\web\src\main\resources\application.yaml
```yaml
#修改markdown存放路径及资源文件存放路径
res:
  markdownPath: "C:\\dev\\markdown\\doc"
  resourcePath: "C:\\dev\\markdown\\resources"

#修改服务端口
server:
  port: 8080
```



## build

构建js目录
```shell

cd fran-wiki\web\src\main\resources\front
npm run watch
```

构建java
```shell

cd fran-wiki
mvn package -Dmaven.test.skip

cd fran-wiki\web\target
java -jar web.jar

```


