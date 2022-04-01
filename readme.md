## 说明

该程序随机生成DOT地址，并可以使用该地址批量转出等额DOT  
请使用nodejs V16版本

## 第一步 准备工作 & 生成地址

`
npm i  
nodejs gen_address.js
`

输出为：

[2022-04-01T13:53:07.417Z] stamp brisk economy twenty budget shiver hammer custom rent grant coconut divert  
[2022-04-01T13:53:07.428Z] 13gwVzXJJjGHzjsvUqjcG4BPbi6my2bBnSs2bdHNmq99iNaV

其中请妥善保管 **助记词**

## 第二步 转入DOT

将DOT转入第一步中生成的地址内

## 第三步 配置参数

将第一步生成的助记词填入*config.json*文件内 **Mnemonics** 项  
将所有目标地址列表填入*config.json*文件内 **addresses** 项  
修改*config.json*内的 **amount** 字段，为转账金额。（目前500000000为0.05DOT）

## 第四步 执行批量转账

`
node batch_transfer.js
`

所有交易为串行之行，前后间隔**20**秒