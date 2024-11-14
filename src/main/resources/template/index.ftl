<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>订单信息页面</title>
    <link href="../static/main.css" rel="stylesheet" />
</head>
<body>
<div class="container">
    <section class="form-section card">
        <h2>新增订单信息</h2>
        <form id="orderForm">
            <div class="form-group">
                <label for="orderNumber">单号</label>
                <input type="text" id="orderNumber" name="orderNumber" required>
            </div>
            <div class="form-group">
                <label for="worker">师傅</label>
                <input type="text" id="worker" name="worker">
            </div>
            <div class="form-group">
                <label for="notes">备注</label>
                <textarea id="notes" name="notes" rows="4"></textarea>
            </div>
            <button type="submit" id="submitBtn" onclick="postData()">提交</button>
        </form>
    </section>
    <section class="info-section card">
        <div class="action-section">
            <h2>未完成订单</h2>
            <p>今日已处理<span style="color: red;">${orderCount}</span>个工单</p>
        </div>
        <div class="action-section">
            <button style="margin-right: 20px" onclick="">刷新</button>
        </div>
        <div class="info-list" id="nonexistentOrders"></div>
    </section>
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

<div id="dataModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>原始数据</h2>
        <div id="modalData"></div>
    </div>
</div>

<script type="application/javascript" src="../static/jquery-3.7.1.min.js"></script>
<script type="application/javascript" src="../static/axios.min.js"></script>
<script type="application/javascript" src="../static/main.js"></script>

<script>
    displayExistingOrders();
</script>
</body>
</html>