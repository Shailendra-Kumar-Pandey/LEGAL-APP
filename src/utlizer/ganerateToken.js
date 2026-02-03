import jwt from 'jsonwebtoken';

export const token = (_id, email)=>{
    return jwt.sign({_id, email}, "ahgsdjgaecahisdhco",{expiresIn: '7d'})     
}


// 1)- enter any element  {_id, email}
// 2)- Enter rendom text "asdahskdjhasjhdkajshd", {This is very importent text security text }
// 3)- algoritham and expire time {expiresIn: '7d'} 