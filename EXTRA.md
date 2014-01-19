Tout d'abord, la Bbox sensation implémente le standard uPnP (http://www.upnp.org/). Ceci permet d'envoyer des requêtes à la box (en HTTP), et ainsi la contrôler à distance.

Pour comprendre comment la communication est faite avec la bbox, j'ai tout d'abord installé l'application B.tv (dans mon cas, pour android), en utilisant la fonctionnalité Télécommande. Ensuite, j'ai lancé Charles - l'équivalent de Wireshark, pour Mac OS X -  que j'ai configuré pour sniffer les requêtes venant de mon Nexus 5. J'ai pu donc voir les requêtes passer entre le tel et la bbox. 
Bref, au final j'ai compris que l'application B.tv envoye des requêtes SOAP (c'est comme ça que fonctionne uPnP) à l'IP de la bbox, cad http://192.168.1.95 sur le port uPnP standard 9020.

Ensuite, sous Windows, j'ai utilisé les outils de dev pour uPnP (http://opentools.homeip.net/dev-tools-for-upnp) et grâce à Device Spy, je pouvais voir les équipements uPnP de mon réseau local. De plus, l'outil permet d'inspecter ces équipements, et même les intéroger à distance en invoquant les actions offertes par l'équipement en question. Et hop! un petit coup de Wireshark et j'avais tous ce qu'il me fallait pour coder mon appli ^^

Voici les URL accessibles par la bbox, ces URL decrivent les fonctionnalités uPnP offertes par la bbox :
* http://192.168.1.95:9020/AVTransport.xml
* http://192.168.1.95:9020/TMRDeviceDescription.xml
* http://192.168.1.95:9020/RenderingControl.xml

Voilà! maintenant, le reste c'est un jeu d'enfant.