
function generateContent(diagram, mld, opt) {
    let content = "";
    let tag = "";
    let end = "";
    if (opt == "MCD") content = schema.MCDToSVG.generateSVG(diagram).toString();
    else if (opt == "UML-Domaine") content = schema.UMLToSVG.generateSVG(diagram, false, true).toString();
    else if (opt == "UML-Classes") content = schema.UMLToSVG.generateSVG(diagram, true, true).toString();
    else if (opt == "UML-API") content = schema.UMLToSVG.generateSVG(diagram, true, false).toString();
    else if (opt == "MR-EN") content = "<pre>" + mld.toString(false) + "</pre>";
    else if (opt == "MR-Univ") {
        content = "<pre>" + mld.toString(true) + "</pre>";
        content = content.replaceAll("\x1B[4m", '<span style="text-decoration:underline">');
        content = content.replaceAll("\x1B[0m", "</span>");
    } else if (opt == "MLD") content = schema.MLDToSVG.generateSVG(mld, false).toString();
    else if (opt == "Tables") content = schema.MLDToSVG.generateSVG(mld, true).toString();
    else if (opt == "SQL-MariaDB") content = "<pre>" + database.DBMariaDB.formatSQL(mld) + "</pre>";
    else if (opt == "SQL-PostgreSQL") content = "<pre>" + database.DBPostgreSQL.formatSQL(mld) + "</pre>";
    else if (opt == "SQL-Sqlite") content = "<pre>" + database.DBSqlite.formatSQL(mld) + "</pre>";
    return content;
}


function dbconcept_create(){
    // let code_source ='Commande: idCommande [COUNTER], dateCommande [DATE]\n' +
    //     'Commander, 0N Client, 11 Commande\n' +
    //     'Client: idClient [COUNTER], nom, prénom, rue, ville, code postal [CHAR(5)]\n' +
    //     '\n' +
    //     'Comprendre, 0N Commande, _11 LigneCommande\n' +
    //     ':\n' +
    //     'Parrainer, 0N [parain] Client, 01 Client\n' +
    //     '\n' +
    //     'LigneCommande: noLigne [INT], qte [INT], prixAchat [FLOAT]\n' +
    //     'Concerner, 11 LigneCommande, 0N Produit\n' +
    //     'Produit: référence [CHAR(4)], libellé, prixCatalogue [FLOAT]' ;

     for(var i in document.getElementsByClassName('dbconcept')) {
        let element = document.getElementsByClassName('dbconcept')[i];
        let code_source = element.innerText;
        let types = element.getAttribute('data-type').trim().split(' ');

        let diagram = source.Mocodo.load(code_source + "\n");
        if (diagram != null) {
            let mld = transform.DiagramToMLD.transform(diagram);
            transform.DiagramToUML.transform(diagram);
            element.innerHTML='';
            for(var j in types) {
                let content = generateContent(diagram, mld, types[j]);
                if (content == '') {
                    content = code_source;
                }
                element.innerHTML += content;
            }
        }
     }
}

dbconcept_create();