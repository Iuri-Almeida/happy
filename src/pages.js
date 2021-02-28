// importar banco de dados
const Database = require('./database/db.js');
const saveOrphanage = require('./database/saveOrphanage.js');

module.exports = {

    index(request, response) {
        return response.render('index');
    },

    async orphanage (request, response) {

        // pegando o id do request quando entrar na página
        const id = request.query.id;

        try {
            // chamando o banco de dados
            const db = await Database;

            // consultar somente um orfanato, pelo ID
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`);
            const orphanage = results[0];

            // colocando os links das imagens em um array
            orphanage.images = orphanage.images.split(",");
            orphanage.firstImage = orphanage.images[0];

            // tornando o open_on_weekends em bolean
            if (orphanage.open_on_weekends == "0") {
                orphanage.open_on_weekends = false;
            }

            else {
                orphanage.open_on_weekends = true;
            }

            return response.render('orphanage', { orphanage });
        } 
        
        catch (error) {
            console.log(error);
            return response.send('Erro no banco de dados!');
        }
    },

    async orphanages (request, response) {
        
        try {
            // chamando o banco de dados
            const db = await Database;

            // consultar dados da tabela
            const orphanages = await db.all(`SELECT * FROM orphanages`);
            return response.render('orphanages', { orphanages });
        } 
        
        catch (error) {
            console.log(error);
            return response.send('Erro no banco de dados!');
        }
    },

    createOrphanage (request, response) {
        return response.render('create-orphanage');
    },

    async saveOrphanage (request, response) {
        const fields = request.body;

        // validar se todos os campos do form estão preenchidos
        if (Object.values(fields).includes('')) {
            return response.send('Todos os campos devem ser preenchidos!')
        }

        try {
            // salvar um orfanato
            const db = await Database;
            await saveOrphanage (db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends
            });

            // redirecionamento da página após o cadastro
            return response.redirect('/orphanages')
        }
        
        catch (error) {
            console.log(error);
            return response.send('Erro no bando de dados!')
        }
    }

}