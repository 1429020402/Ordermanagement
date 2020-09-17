//引入axios插件
import axios from 'axios'

//设置请求基本路径
axios.defaults.baseURL='http://127.0.0.1:5000'

//设置商品图片上传地址
export var upload_img_address='http://127.0.0.1:5000/goods/goods_img_upload';
//设置数据库路径
export var mysql_address='http://127.0.0.1:5000/upload/imgs/goods_img/';
//设置数据库店铺路径
export var shop_address='http://127.0.0.1:5000/upload/shop/';
////设置店铺图片上传地址
export var upload_shop_img='http://127.0.0.1:5000/shop/upload';
//封装函数
//暴露
//ES6箭头函数
export var Login=(account,password)=>axios.post('/users/checkLogin',{account:account,password});

//验证token是否过期
export var Checktoken=(token)=>axios.get('/users/checktoken',{params:{token}});

//添加账号

export var Add=(account,password,userGroup)=>axios.post('/users/add',{account:account,password,userGroup});

//获取账号列表
export var List=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}});

//删除账号
export var Del=id=>axios.get('/users/del',{params:{id}});

//修改密码
export var editpwd=(newPwd,id)=>axios.post('/users/editpwd',{newPwd,id});

//获取账号信息
export var accountinfo=id=>axios.get('/users/accountinfo',{params:{id}});

//检测旧密码是否正确
export var checkoldpwd=(oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}});

//修改账号
export var edit=(account,userGroup,id)=>axios.post('/users/edit',{account,userGroup,id});

//批量删除账号
export var batchdel=(ids)=>axios.get('/users/batchdel',{params:{ids}});

//获取分类
export var Catelist=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}});

//添加分类
export var Addcate=(cateName,state)=>axios.post('/goods/addcate',{cateName,state});

//删除分类
export var Delcate=(id)=>axios.get('/goods/delcate',{params:{id}});

//查询所有分类名称
export var Categories=()=>axios.get('/goods/categories',{params:{}});

//修改分类
export var Editcate=(id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state})

//商品图片上传接口
export var Goods_img_upload=(code,msg,imgUrl)=>axios.post('/goods/goods_img_upload',{code,msg,imgUrl})

//添加商品
export var Additem=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc});

//获取商品列表
export var Itemlist=(currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}})

//删除商品
export var Itemdel=(id)=>axios.get('/goods/del',{params:{id}})

//修改商品
export var Itemedit=(name,category,price,imgUrl,goodsDesc,id)=>axios.post('/goods/edit',{name,category,price,imgUrl,goodsDesc,id})

//首页报表接口
export var totaldata=()=>axios.get('/order/totaldata',{params:{}});

//获取订单列表
// export var order_list=(currentPage,pageSize)=>axios.get('/order/list',{params:{currentPage,pageSize}})
export var order_list=(params)=>axios.get('/order/list',{params})

//订单查询
// export var order_search=(currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get('/order/search',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})


//获取订单详情
export var order_detail=(id)=>axios.get('/order/detail',{params:{id}})

//修改订单
export var order_esit=(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})

//获取店铺详情
export var shop_info=()=>axios.get('/shop/info',{params:{}})

//首页报表接口
export var Totaldata=()=>axios.get('/order/totaldata')

//订单报表接口
export var ordertotal=(date)=>axios.get('/order/ordertotal',{params:{date}})

//店铺内容修改
export var shop_edit=(edit)=>axios.post('/shop/edit',edit)