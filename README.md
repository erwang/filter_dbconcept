# Plugin Filter DBConcept
Plugin filter to create Merise schema from text ([Mocodo](http://mocodo.wingi.net/) format).

It uses [DBConcept](https://dbconcept.tuxfamily.org/) tool made by FranK ENDRES (frankendres@tuxfamily.org).
Complete syntax is available at [https://dbconcept.tuxfamily.org/](https://dbconcept.tuxfamily.org/).

This plugin is distributed under [CeCILL v2.1](http://cecill.info/licences/Licence_CeCILL_V2.1-en.html) licence.


## Use :
Add Mocodo format text between [dbconcept]...[/dbconcept]
Example :
```
[dbconcept]
Book:id,title
writes, 1N Book, 1N Author
Author:id,firstname,lastname
[/dbconcept]
```
Default view is MCD, if you want another schema :
```
[dbconcept MLD]
Book:id,title
writes, 1N Book, 1N Author
Author:id,firstname,lastname
[/dbconcept]
```
Multiple views is available :
```
[dbconcept MLD SQL-MariaDB]
Book:id,title
writes, 1N Book, 1N Author
Author:id,firstname,lastname
[/dbconcept]
```


Available values are :
* MCD (default value)
* UML-Domaine
* UML-Classes
* UML-API
* MR-EN
* MR-Univ
* Tables
* SQL-MariaDB
* SQL-PostgreSQL
* SQL-Sqlite
