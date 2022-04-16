# 0. Feature

## 0.1 UI 相关

- 正负情感占比[rank] 入口：总的/app/keyword [搜索/过滤]: 发现哪些评论更好评\坏评

- 选出几个app\keywords(3~6）?显示比较视图（optional）

- 在(app里内)总评论中某keyword占比[rank]: 发现用户更关注哪个widge

- review本身 入口：keywords/正负向/app [展示示例，支持搜索显示，全部内容可下载json/csv?]

- 用户上传review（json/csv）返回一个文件，表示每个对应的评论是否UI相关/用户指定数据可视化

- 用户上传google app的号，爬计算显示（慢）不会实时，计算完成吼发邮件（注册/提交前提供邮箱）

- ~~注册(可以做用户所有上传数据结果管理)or不注册(返回提交id,用户根据id)？~~

  ~~设置用户：userfriendly，方便查看所有提交数据，privacy 不设置用户：简单，不需要维护~~

# 1. API

## 1.1. API V1 接口说明

- 接口基准地址：~~`http://127.0.0.1:8888/api/private/v1/`~~
- 服务端已开启 CORS 跨域支持 
- 需要授权的 API ，必须以`/api`开头
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 1.1.1. 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- ~~POST（CREATE）：在服务器新建一个资源。~~

### 1.1.2. 通用返回状态说明

| *状态码* | *含义*                | *说明*           |
| -------- | --------------------- | ---------------- |
| 200      | OK                    | 请求成功         |
| 404      | NOT FOUND             | 请求的资源不存在 |
| 500      | INTERNAL SERVER ERROR | 内部错误         |

------

## 1.2. rank

### 1.2.1. rank info

- 请求路径：`/api/rank`
- 请求方法：get
- 请求参数

| 参数名 | 参数类型 | 备注                                                 |
| ------ | -------- | ---------------------------------------------------- |
| order  | int      | 排序方法 0: count 1: pos rank 2: neg rate 3: UI rate |
| page   | int      | 第几页（page=2返回app/keyword: 11到20）              |

- 响应参数

| 参数名 | 参数说明 | 备注                        |
| ------ | -------- | --------------------------- |
| app    | array    | 按照排序方式10个app信息     |
| key    | array    | 按照排序方式10个keyword信息 |

- page=1: app=[rank1~rank10], key=[rank1~rank10]
- page=2: app=[rank11~rank20], key=[rank11~rank20]
- page10: app=[rank90~rank100],key=[rank90~rank100]
- page11: app=[rank101~rank110],key=[rank101]
- page294:app=[rank2931~rank2940],key=[]
- page295:app=[rank2941],key=[]
- page不会给异常数据
- 响应数据

```json
{
    "data": {
        "app": [
            {
                "rank": 1,
                "name": "Wecome",
                "total": 99899,
                "positive": 82333,
                "negative": 17833,
                "rate": "93%",
                "UIrate": "30%", 
                "id": "4a2213"
            }
        ],
        "key":[
			{
                "rank": 1,
                "name": "Button",
                "total": 10000,
                "positive": 9000,
                "negative": 1000,
                "rate": "90%",
                "UIrate": "30%",
                "id": "11"
            }
        ]
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

## 1.3. app

### 1.3.1. app info

- 请求路径：`api/app`
- 请求方法：get
- id不在数据库中返回错误信息
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | String   | appid或者commit id    |
| type   | int      | 0: appid 1: commit id |

- 响应参数

| 参数名     | 参数说明 | 备注                           |
| ---------- | -------- | ------------------------------ |
| info       |          | 关于此app的信息                |
| version    | array    | 各个版本pos rate, 不要超过10个 |
| posExample |          | 一系列信息, （伪）随机抽一个   |
| negExample |          | 一系列信息，（伪）随机抽一个   |

- 响应数据

```json
{
    "data": {
        "info": {
            "name":"Wecome",
            "total":99899,
            "pos":82333,
            "neg":17833,
            "posRank": "1/100",
            "UIRank": "1/100",
            "countRank": "1/100",
            "posRate": "50%",
            "UIRate": "30%",
            "link": "http://www.baidu.com",
            "icon": "https://lh3.googleusercontent.com/OILGR0WWMkZQfTPolPKcl7i5avpg-cYc8LRKejPPFbfjwYauhFBoQ_c3xR_AR6R_JOI"
    	},
        "version": [
            {
                "version": "4.1.1",
                "rate": 20
            },
            {
                "version": "4.1.2",
                "rate": 30
            },
            {
                "version": "4.1.3",
                "rate": 80
            }
        ],
        "posExample":{
            "content": "I love the app because its button!",
            "score": 3,
            "version": "4.1.1"
        },
        "negExample":{
            "content": "I hate the app because its button!",
            "score": 2,
            "version": "4.1.1"
        }
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

appid不存在时返回

```json
{
    "data": {},
    "meta": {
        "msg": "NOT FOUND",
        "status": 404
    }
}
```



### 1.3.2. app keyword rank

- 请求路径：`api/app/rank`
- 请求方法：get
- 固定返回大小<= 7
- 请求参数

| 参数名 | 参数说明 | 备注                                      |
| ------ | -------- | ----------------------------------------- |
| order  | int      | 排序方法 0: count 1: pos rank 2: neg rate |
| id     | String   | appid或者commit id                        |
| type   | int      | 0:appid,1:commitid                        |

- 响应参数

| 参数名 | 参数说明 | 备注      |
| ------ | -------- | --------- |
| info   | array    | length<=7 |

- 响应数据

```json
{
    "data": {
        "info": [
            {
                "rank": 1,
                "name": "Button",
                "total": 3322,
                "positive": 82333,
                "negative": 17833,
                "rate": "93%"
            }
        ]
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

+ appid不正确时响应

```json
{
    "data": {},
    "meta": {
        "msg": "NOT FOUND",
        "status": 404
    }
}
```



### 1.3.3. down load all reviews of app

- 请求路径：`/api/download/app`
- 请求方法：get
- 写给hyr：要一个文件夹，包含所有app对应的review的json文件
- 请求参数

| 参数名 | 参数说明 | 备注                             |
| ------ | -------- | -------------------------------- |
| type   | String   | app: "app"; keyword:"key"        |
| id     | String   | appid 或者String表示的 keywordid |

- 响应数据： 返回一个file

```json
我也不知道返回的什么反正能下载
```

### 1.3.4. siwtch review example

- 请求路径：`/api/app/switch`
- 请求方法：get
- 从数据库中(伪)随机抓取一个review 返回前端（一定为UI related）
- 请求参数

| 参数名 | 参数说明 | 备注         |
| ------ | -------- | ------------ |
| type   | int      | 1:pos -1:neg |
| id     | String   | appid        |

- 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| content | String   |      |
| score   | int      |      |
| version | String   |      |

- 响应数据

```json
{
    "data": {
        "content": "The button is suprisingly great!",
        "score": 5,
        "version": "4.1.3"
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

## 1.4. keyword

### 1.4.1. keyword info

- 请求路径：`/api/keyword`
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注       |
| ------ | -------- | ---------- |
| id     | int      | keyword id |

- 响应参数

| 参数名     | 参数说明 | 备注                     |
| ---------- | -------- | ------------------------ |
| info       |          | 关于keyword的基本信息    |
| posExample |          | 包含内容，出处app和score |
| negExample |          | （伪）随机从所有里       |

- 响应数据

```json
{
    "data": {
        "info":{
            "id": "2",
            "name":"Bar",
            "total":23333,
            "pos":23333,
            "neg":10000,
            "posRank": "2/100",
            "countRank": "2/100",
            "posRate": "50%"
        },
        "posExample":{
            "content": "I love the bar in xxx APP!",
            "score": 3,
            "name": "Wecome"
        },
        "negExample":{
            "content": "I hate the bar in xxx APP!",
            "score": 2,
            "name": "Wecome"
        }
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

### 1.4.2. keyword里所属app rank

- 请求路径：`/api/keyword/rank`
- 请求方法：post
- 固定返回大小<= 5
- 请求参数

| 参数名 | 参数说明 | 备注                                      |
| ------ | -------- | ----------------------------------------- |
| order  | int      | 排序方法 0: count 1: pos rank 2: neg rate |
| id     | int      | keyword rate                              |

- 响应参数

| 参数名 | 参数说明 | 备注          |
| ------ | -------- | ------------- |
| rank   | int      |               |
| name   | String   |               |
| total  | int      |               |
| pos    | int      |               |
| neg    | int      |               |
| rate   | String   | positive rate |
|        |          |               |

- 响应数据

```json
{
    "data": {
        "info": [
            {
                "rank": 1,
                "name": "Wecome",
                "total": 3322,
                "positive": 82333,
                "negative": 17833,
                "rate": "93%"
            }
        ]
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

### 1.4.3. down load all reviews of keyword

- 请求路径：`/api/download`
- 请求方法：get
- 请求参数/响应方法：同 1.3.3

### 1.4.4. siwtch review example

- 请求路径：`/api/keyword/switch`
- 请求方法：get
- 从数据库中随机抓取一个review 返回前端
- 请求参数

| 参数名 | 参数说明 | 备注         |
| ------ | -------- | ------------ |
| type   | int      | 1:pos -1:neg |

- 响应参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| content | String   |          |
| score   | int      |          |
| name    | String   | app name |

- 响应数据

```json
{
    "data": {
        "content": "The button is suprisingly great!",
        "score": 5,
        "name": "Wechat"
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

## 1.5. 支持搜索app name和keyword text

### 1.5.1. app name 转app id

- 请求路径：`/api/app/id`
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注                 |
| ------ | -------- | -------------------- |
| name   | String   | 直接读取，空格不转换 |

- 响应数据(length==1): 比1.3.1多一个属性“isExact”
- 响应数据(length>=1)

```json
{
    "data": {
        "id": [
            {
            	"id":"abcd3"
        	},
            {
                "id":"22sda"
            },
            {
                "id":"e4ds2"
            }
        ]
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

+ 响应异常（length==0）

```json
{
    "data": {},
    "meta": {
        "msg": "NOT FOUND",
        "status": 404
    }
}
```



### 1.5.2. keyword text 转keyword id

- 请求路径：`/api/keyword/id`
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注         |
| ------ | -------- | ------------ |
| text   | String   | 空格不做处理 |

- 响应数据

```json
{
    "data": {
        "id": "1"
    },
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

+ 异常数据

```json
{
    "data": {},
    "meta": {
        "msg": "NOT FOUND",
        "status": 404
    }
}
```



## 1.6. 用户自定义分析APP

### 1.6.1. submit 信息

- 请求路径：`/api/new`
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注  |
| ------ | -------- | ----- |
| id     | String   | appid |
| email  | String   |       |

- 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| cat_id    | 分类 ID      |      |
| cat_name  | 分类名称     |      |
| cat_pid   | 分类父 ID    |      |
| cat_level | 分类当前层级 |      |

- 响应数据

```json
{
    "data":{},
    "meta": {
        "msg": "success",
        "status": 200
    }
}
```

```json
{
    "data":{},
    "meta": {
        "msg": "already exist",
        "status": 400
    }
}
```

```json
{
    "data":{},
    "meta": {
        "msg": "Invalid ID",
        "status": 404
    }
}
```
