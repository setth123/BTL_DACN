export const dateConnect=(date1,date2)=>{
    console.log(date1,date2);
    const n_d1=date1.split('-').reverse().join('-');
    const n_d2=date2.split('-').reverse().join('-');
    return n_d1+" to "+n_d2;
}
export const splitKMArr=(kmArray)=>{
    kmArray.sort((a,b)=>b.ngayBD-a.ngayBD);
    const m=Math.ceil(kmArray.length/2);
    const l=kmArray.slice(0,m);
    const r=kmArray.slice(m);
    return{l,r};
}
export const toDatetimeLocalString=(date)=>{
    const pad = (n) => n.toString().padStart(2, '0');
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);  // Tháng bắt đầu từ 0
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  