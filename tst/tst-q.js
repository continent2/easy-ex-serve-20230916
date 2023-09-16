const Queue = require('bee-queue')
const jobqueue = new Queue('mine');
const STRINGER = JSON.stringify
const enqueue_job=async ( job )=>{
  let resp = await jobqueue.createJob ( job ).save()
	LOGGER( { resp } )
}
enqueue_job({ uuid : 'abc' } )

/* const get_first_of_queue=async ()=>{
    let respjobs = await jobqueue.getJobs('waiting' )
    let aids = respjobs.map ( elem => +elem?.id )
    let idmin  = Math.min ( ... aids )
  return idmin
}
const dequeue_job =async ()=>{
  let resp = await jobqueue.checkHealth()
  let { waiting } = resp
  if ( +waiting > 0 ) {
//    let respjobs = await jobqueue.getJobs('waiting' )
  //  let aids = respjobs.map ( elem => +elem?.id ) 
    // let idmin  = Math.min ( ... aids )
    let idmin = await get_first_of_queue ()
    let job = await jobqueue.getJob( idmin )
    await jobqueue.removeJob ( idmin )
    return job
  }
  else {return false }
*/
