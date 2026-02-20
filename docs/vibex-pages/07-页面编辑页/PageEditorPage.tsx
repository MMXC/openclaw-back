/**
 * 页面编辑页 - 未来科幻AI风格
 */

import React, { useState } from 'react';

const ComponentItem = ({ icon, name }) => (
  <div draggable style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 10, cursor: 'grab', marginBottom: 8, border: '1px solid transparent', transition: 'all 0.2s', ':hover': { background: 'rgba(0,255,255,0.1)', borderColor: 'rgba(0,255,255,0.2)' } }}>
    <span style={{ fontSize: 18 }}>{icon}</span>
    <span style={{ fontSize: 13, color: '#fff' }}>{name}</span>
  </div>
);

const DeviceFrame = ({ children }) => (
  <div style={{ background: '#1a1a1a', borderRadius: 20, padding: 16, boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
    <div style={{ height: 28, background: '#2a2a2a', borderRadius: '10px 10px 0 0', margin: -16, marginBottom: 16, display: 'flex', alignItems: 'center', paddingLeft: 14, gap: 6 }}>
      {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
    </div>
    {children}
  </div>
);

export default function PageEditorPage() {
  const [device, setDevice] = useState('desktop');
  const [zoom, setZoom] = useState(50);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0f' }}>
      <aside style={{ width: 240, borderRight: '1px solid rgba(0,255,255,0.1)', padding: 16, overflowY: 'auto' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>基础组件</h3>
        {[['📝','输入框'],['🔘','按钮'],['☑️','复选框'],['⬇️','下拉框'],['🔠','文本'],['🖼️','图片'],['📊','卡片'],['📋','列表'],['🏷️','标签']].map(([i,n], idx) => <ComponentItem key={idx} icon={i} name={n} />)}
        <h3 style={{ margin: '24px 0 16px', fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>布局组件</h3>
        {[['📦','容器'],['⬜','网格'],['📏','分隔线'],['🔲','弹窗']].map(([i,n], idx) => <ComponentItem key={idx} icon={i} name={n} />)}
      </aside>

      <main style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, padding: '6px 12px', background: 'rgba(0,0,0,0.7)', borderRadius: 12, border: '1px solid rgba(0,255,255,0.2)' }}>
          {['desktop','tablet','mobile'].map(d => <button key={d} onClick={() => setDevice(d)} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: device===d?'rgba(0,255,255,0.2)':'transparent', color: device===d?'#00ffff':'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 13 }}>{d==='desktop'?'🖥️':d==='tablet'?'📱':'📱'}</button>)}
        </div>
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
          <div style={{ transform: `scale(${zoom/100})`, transformOrigin: 'center' }}>
            <DeviceFrame><div style={{ background: '#fff', borderRadius: 10, minHeight: 400, padding: 30 }}><div style={{ color: '#333', textAlign: 'center', paddingTop: 120 }}><p style={{ margin: 0, fontSize: 14 }}>拖拽组件到此处开始编辑</p></div></div></DeviceFrame>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: 'rgba(0,0,0,0.7)', borderRadius: 20 }}>
          <button onClick={()=>setZoom(Math.max(25,zoom-25))} style={{ background:'none',border:'none',color:'#00ffff',cursor:'pointer' }}>-</button>
          <span style={{ fontSize:12,color:'#fff' }}>{zoom}%</span>
          <button onClick={()=>setZoom(Math.min(200,zoom+25))} style={{ background:'none',border:'none',color:'#00ffff',cursor:'pointer' }}>+</button>
        </div>
      </main>

      <aside style={{ width: 260, borderLeft: '1px solid rgba(0,255,255,0.1)', padding: 20 }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 13, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>属性</h3>
        {[['宽度','100%'],['高度','auto']].map(([l,v],i) => <div key={i} style={{ marginBottom: 20 }}><label style={{ display:'block',fontSize:12,color:'rgba(255,255,255,0.5)',marginBottom:6 }}>{l}</label><input defaultValue={v} style={{ width:'100%',padding:'10px',background:'rgba(0,255,255,0.05)',border:'1px solid rgba(0,255,255,0.2)',borderRadius:8,color:'#fff',fontSize:13 }} /></div>)}
      </aside>
    </div>
  );
}
