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