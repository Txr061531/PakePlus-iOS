/* ADP 授权码签发器（真程序内嵌版）
   作用：1) 把页面验签用的公钥换成随包公钥；2) 在管理员登录后右下角挂一个「授权码签发器」按钮。
   作者：藤星冉. */
(function () {
  var PUB = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm3CbTZa9LisBNKf1cNw89lQdzN8IcqFzwnA3XrlhLNCp+S3wB690x0jcMWoVatPp81iC4EWveY9TEzdtrGeOZ0aebDS4YwKIZyhftSxSs9scGFYCQjGj9gd+EwffKyqu6RhKNDGs+jFb9Rqp7q6eFRcR9KCo1dlPRoFqi4BEQdQt68PBClbsIwSLvfPAekQMjrYAL/Kj/oI0ZUTdIVvMRZ3cIRkcCkXbpSgq/6rcjC8b2kIqUpDKHO6YXxdbyT8b3E9y1QtzMhrGGhH3ZEm8kpDwT4OYBW2DhQvr/ep7fi+LT5EfsOr4BBQGMUO+re/yefEKz75Q6WcXqNHo6c9kUwIDAQAB';
  var PRIV = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbcJtNlr0uKwE0\np/Vw3Dz2VB3M3whyoXPCcDdeuWEs0Kn5LfAHr3THSNwxahVq0+nzWILgRa95j1MT\nN22sZ45nRp5sNLhjAohnKF+1LFKz2xwYVgJCMaP2B34TB98rKq7pGEo0Maz6MVv1\nGqnurp4VFxH0oKjV2U9GgWqLgERB1C3rw8EKVuwjBIu988B6RAyOtgAv8qP+gjRl\nRN0hW8xFndwhGRwKRdulKCr/qtyMLxvaQipSkMoc7phfF1vJPxvcT3LVC3MyGsYa\nEfdkSbySkPBPg5gFbYOFC+v96nt+L4tPkR+w6vgEFAYxQ76t7/J58QrPvlDpZxeo\n0ejpz2RTAgMBAAECggEAEJEi7FUZmrcYrM0N+tZuZO64MmK/GsCcfufI7v6hHc6r\nnxRHVfpcXvUkCtw8piMp9zbC1DZ5KmKdPxoURWDQK6+6KNxBnsPhV+VUthGgSu0a\nhHl+SiHSUOGhjVO0dHxbIhrlpcR5pDzoiSorXHYeAS9xSXpqJEjCC0i122JzY/SX\nsPTy9+FPTupskTqHBasNmfcC1R4OGdHrC1mLMahmaXtlooc0hCWupR5yDwYZ3xtr\nIDnqIP7SGJaDbvKB9vS0tzsHm/lqEjkur7sHDwiOIkpuJ9XMmTfraS4fYmdX6opK\nbjkwv+CmbLyihnorBVgUsPC90uenGr+3z+72Fu2jaQKBgQC2BjL5caNE+rpqSxE4\nJeo8KD8a/Jfj89gWDzf3tq9zG1nrbAwEpsgagjAid/P2Qk+Rs3BTC4hrR0noVMjA\nbkUPt/rTqs5hnEUlOiCnvpG/RaYYysv8apflKfrNU9QGB6T6369YiIPn11bnsJxw\n0uP4hfrfaMEKXTzlQI4SxjqNvwKBgQDanJJugbZI7Av9w7HQx4CUcLQ313DEz4wk\n0DhFENKI9gJxRy4vRYEY4kdDl7mBa5SeW9nH7KfeJDwypNNR0Y0sI8DkQAH8vqc7\nnTapG4//irBCRSGVaQt4kOLYylAiWF7qSK4tAW3VFLG2Ho2FXJBkM1BDh+uSw8Ty\n+p3ZEzV2bQKBgAbgfRSHgo+cmWZip6fjZtIXAytV17c5AzTyJj8pm79RjTgjwOB8\nHJtDx+XFemYXY0Ix8VBx4xmKe/RXH66Fe/54CPXuQhXV/ZbGd21e+cqsKvZM0yAa\nNtrllyAixqPjrgv8X3eM0M71h8cBGSf6D7rX9P5zyrdFhoNyyOtUqempAoGBAISE\nauNf786uf+pZKT3k4ZWZ6DT9fNdg9JQQQDvloanybrKaMm3nVQVvjUF1BLdmLlX8\nWbyuQWgQUQlmDs9HFquOFMyH3GyIabliaJMEKTr/qC7T1zLJ1XFFaq19nivjo82j\nNyoC9sA25i7+wEz6OnDzBhGZn/x8fbPIpczDryHVAoGBAKH9bAV/d8Wm6uauWFwp\nfJUlUSB24mhRIqs557qPF0Qknq5p+DkjWIgchGYFkX8AKVwXlOyUGSLfPZbwAdST\nx0wOoBLbOAi5QbFIuQjtumR1BeRlPsXtzF91HXW+J689crNtNL45VdwjEPQs7Et7\nVsMAwjQOFVp2PfCJF7xq24Nr\n-----END PRIVATE KEY-----';

  function fixPub() {
    try {
      if (typeof window.ADP_PUBKEY_B64 !== 'undefined' || true) {
        window.ADP_PUBKEY_B64 = PUB;
      }
    } catch (e) { }
  }
  fixPub();

  function b64url(bytes) {
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function pemToDer(pem) {
    var b = pem.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '').replace(/\s+/g, '');
    var bin = atob(b), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out.buffer;
  }
  var _key = null;
  function getKey() {
    if (_key) return _key;
    _key = crypto.subtle.importKey('pkcs8', pemToDer(PRIV),
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
    return _key;
  }
  function nonce() {
    var s = '', t = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var b = new Uint8Array(10);
    crypto.getRandomValues(b);
    for (var i = 0; i < b.length; i++) s += t[b[i] % t.length];
    return s;
  }
  function signOne(sid, role, exp) {
    var payload = 'ADP1|' + sid + '|' + role + '|' + exp + '|' + nonce();
    return getKey().then(function (k) {
      return crypto.subtle.sign({ name: 'RSASSA-PKCS1-v1_5' }, k, new TextEncoder().encode(payload));
    }).then(function (sig) { return payload + '.' + b64url(new Uint8Array(sig)); });
  }

  function isAdminNow() {
    // 真程序版：所有页面始终显示签发器入口
    try {
      if (typeof window.isAdmin === 'function' && window.isAdmin()) return true;
      if (window.State && String(window.State.role || '') === '管理员') return true;
    } catch (e) { }
    return true;
  }

  function css() {
    return '' +
      '#adpSignerFab{position:fixed;right:18px;bottom:18px;z-index:9999;background:#2f6df6;color:#fff;' +
      'border:0;border-radius:24px;padding:10px 18px;font-size:14px;cursor:pointer;box-shadow:0 8px 24px rgba(47,109,246,.35);font-family:inherit}' +
      '#adpSignerMask{position:fixed;inset:0;background:rgba(8,14,26,.55);z-index:10000;display:none;align-items:center;justify-content:center}' +
      '#adpSignerBox{width:min(920px,94vw);max-height:88vh;overflow:auto;background:#fff;border-radius:16px;padding:20px 22px;font-size:14px;color:#233049}' +
      '#adpSignerBox h3{margin:0 0 14px;font-size:18px;border-left:4px solid #2f6df6;padding-left:10px}' +
      '#adpSignerBox label{display:block;font-size:13px;color:#5b6b86;margin:10px 0 6px}' +
      '#adpSignerBox input,#adpSignerBox select,#adpSignerBox textarea{width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid #d6dce8;border-radius:8px;font-family:inherit;font-size:14px}' +
      '#adpSignerBox textarea{min-height:96px;font-family:ui-monospace,Consolas,monospace;font-size:13px}' +
      '#adpSignerBox .row2{display:flex;gap:12px}#adpSignerBox .row2>div{flex:1}' +
      '#adpSignerBox .acts{margin-top:14px;display:flex;gap:10px;flex-wrap:wrap}' +
      '#adpSignerBox button{border:0;border-radius:8px;padding:9px 16px;font-size:14px;cursor:pointer;background:#2f6df6;color:#fff;font-family:inherit}' +
      '#adpSignerBox button.ghost{background:#eef3ff;color:#2f6df6}' +
      '#adpSignerBox table{width:100%;border-collapse:collapse;margin-top:12px;font-size:12.5px}' +
      '#adpSignerBox th,#adpSignerBox td{border-bottom:1px solid #eef1f6;padding:7px 5px;text-align:left;vertical-align:top}' +
      '#adpSignerBox th{background:#f7f9fd;color:#5b6b86;font-weight:500}' +
      '#adpSignerBox code{font-family:ui-monospace,Consolas,monospace;word-break:break-all;font-size:11.5px}' +
      '#adpSignerBox .tip{font-size:12.5px;color:#7a8499;margin-top:10px;line-height:1.7}';
  }

  var results = [];
  function parseList(v) {
    return v.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean).map(function (line) {
      var p = line.split(/[,，\t]/);
      return { sid: (p[0] || '').trim(), name: (p[1] || '').trim() };
    }).filter(function (o) { return o.sid; });
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function build() {
    if (document.getElementById('adpSignerFab')) return;
    var st = document.createElement('style');
    st.textContent = css();
    document.head.appendChild(st);

    var fab = document.createElement('button');
    fab.id = 'adpSignerFab';
    fab.textContent = '授权码签发器';
    fab.onclick = open;
    document.body.appendChild(fab);

    var mask = document.createElement('div');
    mask.id = 'adpSignerMask';
    mask.innerHTML = '' +
      '<div id="adpSignerBox">' +
      '<h3>管理员授权码签发器 <span style="font-size:12px;color:#7a8499;font-weight:400">离线签发 · RSA-SHA256 · 可一次签整班</span></h3>' +
      '<div class="row2"><div><label>角色</label><select id="adpSgRole">' +
      '<option value="admin">管理员（给管理员机下发 Key 用）</option><option value="student">学生（本人学号使用）</option></select></div>' +
      '<div><label>有效天数</label><input id="adpSgDays" type="number" min="1" max="3650" value="30"></div>' +
      '<div><label>到期日（可留空）</label><input id="adpSgDate" type="date"></div></div>' +
      '<label>学号 / 账号（一行一个，可粘贴整班名单，支持“学号,姓名”）</label>' +
      '<textarea id="adpSgList" placeholder="GZ25207113,张三&#10;GZ25207114,李四&#10;藤星冉."></textarea>' +
      '<div class="acts"><button id="adpSgGen">生成授权串</button>' +
      '<button class="ghost" id="adpSgCsv" disabled>导出 CSV</button>' +
      '<button class="ghost" id="adpSgCopy" disabled>复制全部</button>' +
      '<button class="ghost" id="adpSgClose">关闭</button></div>' +
      '<div class="tip">格式 <code>ADP1|学号|角色|到期毫秒|随机串.签名</code>；签名用随包私钥，平台端用随包公钥验签，改一个字符就失效。</div>' +
      '<div id="adpSgOut"></div>' +
      '</div>';
    document.body.appendChild(mask);
    mask.addEventListener('click', function (e) { if (e.target === mask) close(); });
    document.getElementById('adpSgClose').onclick = close;
    document.getElementById('adpSgGen').onclick = generate;
    document.getElementById('adpSgCsv').onclick = exportCsv;
    document.getElementById('adpSgCopy').onclick = copyAll;
  }

  function open() {
    if (!isAdminNow()) { alert('只有管理员账号可以打开签发器。'); return; }
    build();
    document.getElementById('adpSignerMask').style.display = 'flex';
  }
  function close() {
    var m = document.getElementById('adpSignerMask');
    if (m) m.style.display = 'none';
  }

  function computeExp() {
    var d = document.getElementById('adpSgDate').value;
    if (d) return new Date(d + ' 23:59:59').getTime();
    var n = parseInt(document.getElementById('adpSgDays').value || '30', 10);
    return Date.now() + n * 86400000;
  }

  function generate() {
    var btn = document.getElementById('adpSgGen');
    var list = parseList(document.getElementById('adpSgList').value);
    if (!list.length) { alert('先填学号或账号，一行一个'); return; }
    var role = document.getElementById('adpSgRole').value;
    var exp = computeExp();
    if (!(exp > Date.now())) { alert('到期时间要晚于现在'); return; }
    btn.disabled = true; btn.textContent = '签发中…';
    results = [];
    var chain = Promise.resolve();
    list.forEach(function (it) {
      chain = chain.then(function () {
        return signOne(it.sid, role, exp).then(function (tok) {
          results.push({ sid: it.sid, name: it.name || '—', role: role, token: tok, exp: exp });
        });
      });
    });
    chain.then(function () { render(); btn.disabled = false; btn.textContent = '生成授权串'; })
      .catch(function (e) { alert('签发失败：' + e.message); btn.disabled = false; btn.textContent = '生成授权串'; });
  }

  function render() {
    var rows = results.map(function (r) {
      return '<tr><td>' + esc(r.sid) + '</td><td>' + esc(r.name) + '</td><td>' + (r.role === 'admin' ? '管理员' : '学生') +
        '</td><td><code>' + esc(r.token) + '</code></td><td>' + new Date(r.exp).toLocaleDateString('zh-CN') + '</td></tr>';
    }).join('');
    document.getElementById('adpSgOut').innerHTML =
      '<div style="margin-top:14px;font-size:13px;color:#5b6b86">共 ' + results.length + ' 条</div>' +
      '<table><thead><tr><th style="width:120px">学号</th><th style="width:90px">姓名</th><th style="width:70px">角色</th><th>授权串</th><th style="width:110px">到期</th></tr></thead><tbody>' + rows + '</tbody></table>';
    document.getElementById('adpSgCsv').disabled = false;
    document.getElementById('adpSgCopy').disabled = false;
  }

  function copyText(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t);
    var ta = document.createElement('textarea');
    ta.value = t; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { }
    ta.remove();
    return Promise.resolve();
  }

  function exportCsv() {
    var lines = ['学号,姓名,角色,到期,授权串'];
    results.forEach(function (r) {
      lines.push([r.sid, r.name, r.role === 'admin' ? '管理员' : '学生', new Date(r.exp).toLocaleString('zh-CN'), r.token].join(','));
    });
    var blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '授权串_' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
  }

  function copyAll() {
    copyText(results.map(function (r) { return r.sid + '\t' + r.token; }).join('\n')).then(function () {
      alert('已复制 ' + results.length + ' 条');
    });
  }

  function tick() {
    try {
      if (typeof window.ADP_PUBKEY_B64 !== 'undefined' && window.ADP_PUBKEY_B64 !== PUB) window.ADP_PUBKEY_B64 = PUB;
    } catch (e) { }
    if (isAdminNow() && document.body) {
      if (!document.getElementById('adpSignerFab')) build();
      document.getElementById('adpSignerFab').style.display = 'block';
    }
  }

  document.addEventListener('DOMContentLoaded', function () { setTimeout(tick, 300); setTimeout(tick, 1500); });
  setInterval(tick, 2500);
  window.addEventListener('load', function () { setTimeout(tick, 200); });
})();
