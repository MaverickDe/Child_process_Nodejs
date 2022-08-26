
let { spawn, exec, fork, execFile} = require("child_process")
// const { options } = require("pdfkit")





// SPAWN
// spawn a command in a  process seperatetly
// The spawn() function runs a command in a process. This function returns data via the stream API. Therefore, to get the output of the child process, we need to listen for stream events.

// Streams in Node.js are instances of event emitters. If you would like to learn more about listening for events and the foundations of interacting with streams, you can read our guide on Using Event Emitters in Node.js.

let args = []
let options={}
let child_ = spawn('dir',args,options)


// args are the arguments the commaned needs in order for it to execute ,if omitted it default to an empty array

// options take different key value pairs  to give more clarity on how you want the command executin
g
// you can pass an env to create a virtual evnviroment for the child process where it canget its own env varible
// omitting it default to process.env that is the parent env

// since the child process stdout is a readable Stream, we can read the data and print it in the parent console
// the spawn function does not create a shell to execute its command , hence shell scripts cant be excutend using spawn instead use the exec method

// to let the child process run independently you can pass in {detached :true} to options
child_.stdout.on("data", (data) => {
  console.log(data)
})


process.stdin.pipe(child_.stdin)

child_.on("exit", (code, sig) => {
  console.log(`child process exited with code ${code} and signal ${sig}`)
})


// we can make the child process to inhertit the parent stdio by passing this option the Child
                          // {stdio : inherit}

child_.on("error", (e) => {
  console.log(`error at ${e}`)
})




// #EXEC


// the exec function createa a shell whenexceuting commands ,  hence it has the ability to run sheel script
// in aa much as this is good news , a developer should be careful when accepting users argument as a user can pass in malicious script example {env:PASSWORD:12345}
child2 = exec("gencryp genid", (err, stdout, stderr) => {
  if (err) {
    console.error(err)
  }
  if (stdout) {
    console.error(stdout)
  }
  if (stderr) {
  
    console.log(stderr)
  }
  
})

process.stdin.pipe(child2.stdin)


// we can make the child process to inhertit the parent stdio by passing this option to  the Child process
                          // {stdio : inherit}

child2.on("error", (e) => {
  console.log(`eroor at ${e}`)
})



// #EXECFILE

// if you need to execute a file without using a shell then the execfile function can be useful
// it works exactly like the exec  function
// The key difference between the execFile() and exec() functions is that the first argument of execFile() is now a path to an executable file instead of a command


// #FORK

// The fork function is a variation of the spawn function for spawning node processes. The biggest difference between spawn and fork is that a communication channel is established to the child process when using fork, so we can use the send function on the forked process along with the global process object itself to exchange messages between the parent and forked processes. We do this through the EventEmitter module interface.const { fork } = require('child_process');

const forked = fork('index.js');

forked.on('message', (msg) => {
  console.log('Message from child', msg);
});

forked.send({ hello: 'world' });




// Note: Scripts in Windows such as .bat and .cmd files cannot be run with execFile() because the function does not create a shell when running the file. On Unix, Linux, and macOS, executable scripts do not always need a shell to run. However, a Windows machines needs a shell to execute scripts. To execute script files on Windows, use exec(), since it creates a new shell. Alternatively, you can use spawn(), which you’ll use later in this Step.



// It’s often a good idea to choose spawn() over exec() or execFile() when the command you want to run can output a large amount of data. With a buffer, as used by exec() and execFile(), all the processed data is stored in the computer’s memory. For large amounts of data, this can degrade system performance. With a stream, the data is processed and transferred in small chunks. Therefore, you can process a large amount of data without using too much memory at any one time.