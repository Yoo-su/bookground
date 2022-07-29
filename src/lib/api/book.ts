import axios from 'axios';

//isbn값으로 책 관련 정보 조회
export const getInfoByIsbn=(isbn:string, curUser:string|null|undefined=null)=>{
    return axios.get('/api/getInfoByIsbn',{
        params:{
          isbn:isbn,
          curUser:curUser
        }
      })
}

//사용자 책 평가 정보 업데이트
export const updateBookRep=(isbn:string, curUser:any, thumb:boolean|null)=>{
  return axios.put('/api/updateBookRep',
    {
      isbn:isbn,
      curUser:curUser,
      thumb:thumb,
    }
  )
}


//사용자 의견 등록
export const newComment=(isbn:string, curUser:any, rate:number|null, comment:string, date:string)=>{
  return axios.post('/api/newComment',{
    isbn:isbn,
    curUser:curUser,
    rate:rate,
    comment:comment,
    date:date,
  })
}


//책 관련 사용자들의 의견 조회
export const getComments=(isbn:string)=>{
  return axios.get('/api/getComments',{
    params:{
      isbn:isbn
    }
  })
}