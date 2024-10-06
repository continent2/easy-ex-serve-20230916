const MAP_ORDER_STATUS= {
	WAITING : 	{ status : 0 , statusint : 0 , statusstr: 'WAITING' } , 
	OK: 				{ status : 1 , statusint : 1 , statusstr: 'PROCESSED' } , 
	PROCESSED : { status : 1 , statusint : 1 , statusstr: 'PROCESSED' } , 
	FAILED :		{ status : 2 , statusint : 2 , statusstr: 'FAILED' } , 
	EXPIRED :		{ status : 3 , statusint : 3 , statusstr: 'EXPIRED' } , 
	CANCELED :	{ status : 4 , statusint : 4 , statusstr: 'CANCELED' } , 
}

module.exports={
  MAP_ORDER_STATUS
}