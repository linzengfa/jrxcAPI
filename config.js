'use strict';

module.exports = {
    /**
     * Node 服务器启动端口，如果是自行搭建，请保证负载均衡上的代理地址指向这个端口
     */
    port: '8787',
    mongodb:{
        url:'mongodb://localhost:27017/jrxc'
    }
};
