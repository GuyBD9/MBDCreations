// components/ProductCard.js
import Link from 'next/link';

export default function ProductCard({ id, title="Untitled", price=null }) {
  return (
    <div style={{border:'1px solid #ddd', padding:'1rem', borderRadius:8}}>
      <div style={{height:160, background:'#f5f5f5', marginBottom:12}} />
      <h3 style={{margin:'0 0 .25rem 0'}}>{title}</h3>
      {price !== null && <p style={{margin:0}}>₪ {(price/100).toFixed(2)}</p>}
      {id && (
        <div style={{marginTop:8}}>
          <Link href={`/product/${id}`}>View details</Link>
        </div>
      )}
    </div>
  );
}