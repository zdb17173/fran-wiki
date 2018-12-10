
# wiki

基于本地文件夹，扫描文件目录的wiki。
- 不依赖第三方数据库，仅使用文件目录扫描，文件目录及markdown即为wiki本身，方便后续迁移至其他平台。
- 图片上传
  - 支持本地图片选择上传（顶部菜单upload / add）
  - 支持截图直接粘贴至正文(chrome兼容，其他浏览器未知)
- 文档管理
  - 目录增删改（左侧树右键菜单）
  - markdown增删改（左侧树右键菜单）
- 


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


