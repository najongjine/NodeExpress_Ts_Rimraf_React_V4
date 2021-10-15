var q1=async (db:any)=>{
    return db.query(`
    SELECT * FROM user
    `)
}

export default{
    q1
}