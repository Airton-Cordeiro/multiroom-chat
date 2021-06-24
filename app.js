/* importando as config do server*/
const app = require('./config/server');

/*parametrizar a porta de escuta*/

let server = app.listen(3000, function(){
    console.log("Servidor rodando na porta 3000!")
})

const io = require("socket.io").listen(server)

app.set('io', io);

/* criar conexão por websocket */

io.on("connection", function(socket){
    console.log("O Usuário conectou ", socket.id)

    socket.on("disconnect", function(){
        console.log("O Usuário " + socket.id + " desconectou")
    })


    //Dialogos
    //enviando mensagem apenas para nós
    socket.on('msgParaServidor', function(data){
        
        //dialogos
        //enviando a msg para mim
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );
        //enviando a mesma mensagem para todos os participantes
        socket.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        //participantes
        //enviando a informação dos participantes para mim
        if(parseInt(apelido_atualizado) == 0){
            socket.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );
            //enviando a informação dos participantes para todos
            socket.broadcast.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );
        }
    });

});

