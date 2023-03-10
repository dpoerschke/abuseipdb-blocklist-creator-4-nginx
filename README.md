
A small project from a few years ago - I hope you find it useful. Please scroll down for german translation.


# abuseipdb-blocklist-creator-4-nginx
Tool to automatically create an IP blocklist for Nginx.

# General
`abuseipdb-blocklist-creator` is a node-based application that downloads the current IP-blocklist from abuseipdb.com using a valid API key, prepares it and saves it as a configuration file `abusipdb-blocklist.txt` for Nginx.

The `abusipdb-blocklist.txt` can then be included in the Nginx configuration as follows:

> http {
> ...
>
> \# Block malicious IPs (prepared blocklist from abuseipdb)
>
> include /path/to/abusipdb-blocklist.txt; #Linux
>
> ...
> }

To make Nginx reload the blocklist regularly, you can use e.g. a cron task that executes the following command:
> service nginx reload

**Caution:** If *restart* and not *reload* is used here, Nginx will restart in any case, even if the configuration should be faulty. In this case Nginx exits immediately with an error and the web presence is no longer accessible. The option *reload* on the other hand ensures that Nginx checks the configuration for correct syntax before reloading it and only then accepts it. If the syntax is not correct, Nginx keeps the current configuration (in ram) and the website is still reachable. 

# setup
abuseipdb-blocklist-creator was developed and tested with NodeJS version `14.17.2`. NodeJS version 12.x is not supported.
To install all necessary dependencies you have to install once 
> npm install 

must be called.


# Configuration
First register at www.abuseipdb.com.
Then you can create an API key there at www.abuseipdb.com/account/api. This is a text that looks something like this:
> 69a5c964d91234523ee9153b16bc34d56f43212345d67323a0a6cd22abcde2dec4d755140d3ff7b1

(This is only an example, the key is not valid).

Copy the API key to the clipboard and change to the subdirectory apikey. Create a file there with the extension .key, for example:
> myApi.key

Paste the API key from the clipboard into the meinapi.key file and save the file. The abuseipdb-blocklist-creator will automatically read the file with the extension .key in the apikey directory at startup.

# Start abuseipdb-blocklist-creator-4-nginx
> node index.js

abuseipdb-blocklist-creator is executed once. If you want to update the blocklist regularly, you have to run this command regularly e.g. via cron task. Alternatively you can use the Process Manager PM2.

# Notes about abuseipdb
The IP blocklist of abuseipdb.com includes 10,000 IP addresses for a **free** account. This limit is set by the API. A blocklist with 10.000 IP entries is about 200kb in size. If a free account is used, the blocklist can be accessed a maximum of 5x per day.
(Status of the information: 29.09.2021)

# Notes about abuseipdb
The IP blocklist of abuseipdb.com includes 10,000 IP addresses for a **free** account. This limit is set by the API. A blocklist with 10.000 IP entries is about 200kb in size. If a free account is used, the blocklist can be accessed a maximum of 5x per day.
(Status of the information: 29.09.2021)

The documentation of abuseipdb.com can be found here: 
https://docs.abuseipdb.com/?python#blocklist-endpoint

Nginx PLUS provides its own API for 'denylisting' IP addresses, but this does not seem to provide a way to block a large number of IP addresses at once (see https://docs.nginx.com/nginx/admin-guide/security-controls/denylisting-ip-addresses/ ).
The approach of abuseipdb-blocklist-creator works with the free version of Nginx, too.


---


# abuseipdb-blocklist-creator-4-nginx
Tool zur automatischen Erstellung einer IP-Blocklist für Nginx

# Allgemeines
`abuseipdb-blocklist-creator` ist eine Node-basierte Anwendung, die unter Verwendung eines gültigen API-Keys die aktuelle IP-blocklist von abuseipdb.com herunterlädt, aufbereitet und als Konfigurationsdatei `abusipdb-blocklist.txt` für Nginx speichert.

Die Konfigurationsdatei kann anschließend wie folgt in die Nginx-Konfiguration eingebunden werden:

> http {
>   ...
>
>  	\# Bösartige IPs blocken (aufbereitete blocklist von abuseipdb)
>
>   include /pfad/zur/abusipdb-blocklist.txt; #Linux
>
>   ...
> }

Damit Nginx die Blocklist regelmäßig neu einliest, kann z.B. ein Cron-Task verwendet werden, der folgenden Befehl ausführt:
> service nginx reload

**Achtung:** Wenn hier *restart* und nicht *reload* verwendet wird, startet Nginx auf jeden Fall neu, auch wenn die Konfiguration fehlerhaft sein sollte. In diesem Fall beendet sich Nginx sofort mit einem Fehler und die Webpräsenz ist nicht mehr erreichbar. Die Option *reload* sorgt hingegen dafür, dass Nginx die Konfiguration vor dem erneuten Einlesen auf korrekte Syntax prüft und erst dann übernimmt. Ist die Syntax nicht korrekt, behält Nginx die aktuelle Konfiguration (im Ram) bei und die Webpräsenz ist weiterhin erreichbar. 

# Setup
abuseipdb-blocklist-creator wurde entwickelt und getestet mit NodeJS Version `14.17.2`. NodeJS Version 12.x wird nicht unterstützt.
Zur Installation alle notwendigen Abhängigkeiten muss einmalig 
> npm install 

aufgerufen werden.


# Konfiguration
Registrieren Sie sich zunächst unter www.abuseipdb.com.
Anschließend lässt sich dort unter www.abuseipdb.com/account/api ein API-Key erzeugen. Dies ist ein Text der in etwa so aussieht:
> 69a5c964d91234523ee9153b16bc34d56f43212345d67323a0a6cd22abcde2dec4d755140d3ff7b1

(Dies ist nur ein Beispiel, der Key ist nicht valide)

Kopieren Sie den API-Key in die Zwischenablage und wechseln Sie in in das Unterverzeichnis apikey. Erzeugen Sie dort eine Datei mit der Endung .key, zum Beispiel:
> meinapi.key

Fügen Sie den API-Key aus der Zwischenablage in die meinapi.key Datei ein und speichern Sie die Datei. Der abuseipdb-blocklist-creator liest beim Start automatisch die Datei mit der Endung .key im apikey-Verzeichnis ein.

# Start von abuseipdb-blocklist-creator-4-nginx
> node index.js

abuseipdb-blocklist-creator wird hiermit einmalig ausgeführt. Wenn die blocklist regelmäßig aktualisiert werden soll, dann muss man diesen Befehl regelmäßig z.B. per Cron-Task ausführen. Alternativ bietet sich die Verwendung des Process Managers PM2 an.

# Hinweise zu abuseipdb
Die IP Blocklist von abuseipdb.com umfasst bei einem **kostenlosen** Account 10.000 IP Adressen. Diese Limitierung wird durch die API vorgegeben. Eine blocklist mit 10.000 IP-Einträgen ist ca 200kb groß. Wenn ein kostenloser Account verwendet wird, kann maximal 5x pro Tag die Blocklist abgerufen werden.
(Stand der Information: 29.09.2021)

Die Dokumentation von abuseipdb.com ist hier zu finden: 
https://docs.abuseipdb.com/?python#blocklist-endpoint

Nginx PLUS bietet eine eigene API zum 'Denylisting' von IP Adressen, allerdings scheint diese keine Möglichkeit zu bieten um auf einmal eine große Anzahl von IP Adressen zu sperren (siehe https://docs.nginx.com/nginx/admin-guide/security-controls/denylisting-ip-addresses/ ).
Der Ansatz von abuseipdb-blocklist-creator funktioniert hingegen auch mit der kostenlosen Version von Nginx.
