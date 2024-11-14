<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>订单信息页面</title>
    <link href="../static/main.css" rel="stylesheet" />
</head>
<body style="overflow: auto;">

<div class="container" style="height: auto;">
    <section class="info-section card">
        <div class="action-section">
            <h2>已有订单信息</h2>
            <p>今日已处理<span style="color: red;">${orderCount}</span>个工单</p>
        </div>
        <div class="action-section">
            <button id="flushList" style="margin-right: 20px" onclick="displayExistingOrders()">刷新</button>
            <button id="exportBtn">导出数据</button>
        </div>
        <div class="info-list" id="existingOrders"></div>
    </section>
</div>

<script type="application/javascript" src="../static/jquery-3.7.1.min.js"></script>
<script type="application/javascript" src="../static/axios.min.js"></script>
<script type="application/javascript" src="../static/main.js"></script>

<script>
    displayExistingOrders();
</script>
</body>
</html>