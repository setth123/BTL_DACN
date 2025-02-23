export const dateConnect=(date1,date2)=>{
    console.log(date1,date2);
    const n_d1=date1.split('-').reverse().join('-');
    const n_d2=date2.split('-').reverse().join('-');
    return n_d1+" to "+n_d2;
}