# Guide d'installation Bazzite

Synthèse de mon installation de Bazzite Gnome Nvidia 
<br>
[Documentation Bazzite](https://docs.bazzite.gg)  
[Bazzite releases](https://github.com/ublue-os/bazzite/releases)  
[Blog généraliste sur Linux avec astuces](https://www.linuxtricks.fr/pages/bienvenue-sur-linuxtricks)  
<br><br><br>




## Pré installation

### Type et taille des partitions à créer

|  Partiton          |    Taille          | Type de partition  |
|--------------------|--------------------|--------------------|
|  /boot/efi         |         100 Mo     |        EFI         |
|  /boot             |           1 Go     |        EXT4        |
|  /systemfile       |        > 40 Go     |       BTRFS        |

Détail pour un partitionnement manuel [Fedora Manual Partitioning](https://docs.fedoraproject.org/en-US/fedora-silverblue/installation/).  
Commande pour lister les partitions: `lsblk`  
Article pour retrouver les commandes de changement de droits sur les répertoires: [linux file permissions](https://www.pluralsight.com/resources/blog/tech-operations/linux-file-permissions)  
<br><br><br>




## Commandes utiles sur une uBlue

### Spécifique à uBlue
Update manuel `ujust update`.  
Affiche le contenu du script ujust `ujust --show <script>`.  
<br>

### Commandes rpm-ostree d'une Fedora Atomic
Liste des environnements `rpm-ostree status -v`.  
Conservation de l'environnement actuel (<n>=0) `sudo ostree admin pin <n>`.  
Dé-conservation d'un environnement `sudo ostree admin pin --unpin <n>`.  
<br>
Rollback vers le précédent environnement `rpm-ostree rollback`.  
<br>
Rechercher un package dans le dépôt ostree `rpm-ostree search <package>`.  
Installation d'un package sur la couche de base `rpm-ostree install <package>`.  
Désinstallation d'un package sur la couche de base `rpm-ostree uninstall <package>`.  
<br>
Suppression d'un package livré par défaut dans la couche de base `rpm-ostree override remove <package>`.  
<br>

### Commandes linux
- `rpm -qi <nom du package/programme>` : description de diverses informations sur le package (version, release, date d'installation...)
- `passwd username` : forçage du mot de passe sans tenir compte des restriction de format  
<br><br><br>




## Setup du système

### Secure Boot
Suivre ce guide pour réinstaller le Secure Boot
[Documentation Bazzite - Secure Boot Instructions](https://docs.bazzite.gg/General/Installation_Guide/secure_boot/#method-b-after-installation-method).  
<br>


### Configuration système
Passer le clavier en `Français` et non en `Français (alternative)`  
Changement du nom du PC  
```
hostnamectl set-hostname <hostname>
```
<br>


### Configuration KDE Plasma
Installer sous forme de layer Kvantum `rpm-ostree install kvantum`  
<br>

#### Thèmes et apparences depuis le menu `Couleurs & Thèmes de KDE`  
- Thème global -> Fedora Light (Ne pas installer le thème global WhiteSur, il ne fonctionne pas)  
- Couleurs -> Installer WhiteSur et sélectionner WhiteSurAlt  
- Style d'applications -> kvantum,  -> Configurer un style pour application GNOME / GTK -> Breeze  
- Style Plasma -> Breeze  
- Décoration des fenêtres -> Installer Utterly-Round-Light et le sélectionnner  
- Icônes -> Installer WhiteSur et sélectionner WhiteSur-light  
- Pointeurs -> Bibata Modern Classic  ou  WhiteSur Cursors  
- Ecran de démarrage -> Aucun  
<br>

Depuis le menu `Applications & Fenêtres / Gestion des fenêtres / Effets de bureau`, il est possible de gérer les effets de fenêtre et leur transparence  
<br>

#### Configuration de Kvantum  
Ressources: [WhiteSur KDE](https://github.com/vinceliuice/WhiteSur-kde)    
- Depuis la page du thème WhiteSur, télécharger les deux fichiers de configuration Kvantum  
- Les charger depuis Kvantum Manager, et sélectionner le thème WhiteSur  
<br>

#### Ecran de connexion et de verrouillage  
- Il est possible de modifier les fonds d'écran à utiliser pour les deux processus.  
- Pour garder le thème, le fond d'écran WhiteSur peut être utilisé.  
<br>

#### Configuration des barres et panneaux  
 - A faire à la main, vidéo youtube explicative: [Personnalisation de KDE Plasma pour débutants](https://www.youtube.com/watch?v=u9Otce910qM)  
 - Installer le widget `Panel Colorizer` et le paramétrer sur chacune des barres (panneaux) pour les rendre transparet  
<br>


### Configuration de NANO
Modification du fichier de configuration `/etc/nanorc` :  
- Auto indentation: `set autoindent`
- Affichage du numéro de la ligne: `set linenumbers`  
- Gestion de la souris: `set mouse`  
- Thèmes: `include /usr/share/nano/*.nanorc` et `include /usr/share/nano/extra/*.nanorc`
- Key bindings: décommenter les raccourcis nécessaires : `Crl+X, C, V, Q, S, F, G, Z, Y`
<br>



<br><br><br>
## Setup des applications

### Flatpak
#### Quelques commandes:  
- Liste les sessions `flatpak remotes`  
- Liste les flatpack d'une session `flatpack remote-ls <remote>`  
- Installation et désinstallation sur la session utilisateur `flatpak install <remote> <package>` / `flatpak uninstall <remote> <package>`  
- Rechercher un package `flatpak search <package>`  
- Lancer un package `flatpak run <package>`  
- Permissions d'un package `flatpak info --show-permissions <package>`
- Supprime les 'pins' des packahes `flatpak pin | xargs -n 1 -t sudo flatpak pin --remove`
- Suppression des packages inutilisés et des données cache d'applications supprimées `flatpak remove --delete-data --unused`
<br>

#### FLATSEAL
Ajouter pour toutes les applications les permissions suivantes:  
```
Accélaration GPU : enable
```
<br>

#### Applications utilisées  
A installer sur la session System pour éviter les doublons des packages de base et gagner de la place:  
```
flatpak install system vivaldi simplescan solaar onlyoffice Betterbird
```
digiKam = gestionnaire de photos.  
solaar = gestionnaire de périphériques Logitech.  
<br><br>


### AppImage
Autre service d'applications notamment pour celles achetées.  
Gestion à partir de l'application `Levier de vitesse / Gear Level`.  
Créer un répertoire `~/.AppImages` pour les stocker.  

#### Applications utilisées  
- Cider (acheté via [itch.io](https://itch.io))  
- Chiaki-ng: [releases](https://github.com/streetpea/chiaki-ng/releases) (le flatpak génère trop d'entrées obsolètes ou en doublon)  
<br><br>


### Brew
Applications et services sans GUI. Permet l'installation d'applications utilisées dans les lignes de commande.   

#### Applications utilisées
- exiftool : manipulation de fichiers images et vidéo par ligne de commande
```
Utiliser les paramètres   DateTimeOriginal   ou  CreateDate   pour ces commandes

// Renomme les fichiers par leur date de prise de vue (format YYY-MM-DD_HH:MM_id)
exiftool '-FileName<DateTimeOriginal' -d '%Y-%m-%d_%H:%M_%%-c.%%e' -r ~/Images/Google Photos/

// Crée des répertoires de type YYYY/MM et y déplace les fichiers selon leur date de prise de vue
exiftool -r -d %Y/%m "-directory<createdate" ~/Images

// Remplace les dates de dernière modification des fichiers par leur date de prise de vue
exiftool -overwrite_original '-FileModifyDate<DateTimeOriginal' -r ~/Images/
```
- rclone : montage des disques Webdav  
```
// Créer le fichier de configuration comme indiqué dans la documentation
  rclone config
  -> n) New remote
  -> name> kdrive
  -> type of storage> 63 / WebDAV
  -> url> https://123456.connect.kdrive.infomaniak.com     avec 123456 à remplacer par son id
  -> vendor> 8/ Other site
  -> User name> mail de connexion à kdrive
  -> Password> y) Yes    puis saisir son mot de passe
  -> bearer_token>   Enter to leave empty
  -> edit advanced config> n) No
  -> keep this remote ?> y) Yes

// Montage sous forme de service systemd
Créer un fichier pour le service:  sudo nano /etc/systemd/system/rclone-kdrive.service
Contenu:
  [Unit]
  Description=Rclone mount Kdrive
  Wants=network-online.target
  After=network-online.target

  [Service]
  Type=simple
  User=xxx
  Group=xxx
  ExecStartPre=/usr/bin/mkdir -p /home/xxx/Kdrive
  ExecStart=/home/linuxbrew/.linuxbrew/bin/rclone mount kdrive: /home/xxx/Kdrive --config=/home/xxx/.config/rclone/rclone.conf --vfs-cache-mode full --allow-other
  ExecStop=/usr/bin/fusermount3 -uz /home/xxx/Kdrive

  [Install]
  WantedBy=multi-user.target

Le rendre exécutable: sudo chmod +x  /etc/systemd/system/rclone-kdrive.service
Essayer de le lancer:
  sudo systemctl daemon-reload
  sudo systemctl start rclone-kdrive.service

Vérification par:
  sudo systemctl status rclone-kdrive.service
  ou
  sudo journalctl -u rclone-kdrive.service -b

En cas d'erreur, essayer de lancer la ligne saisie pour vérifier s'il ne s'agit pas d'une typo:
  sudo -u xxx /home/linuxbrew/.linuxbrew/bin/rclone mount kdrive: /home/xxx/Kdrive --config=/home/xxx/.config/rclone/rclone.conf --vfs-cache-mode full --allow-other
Si cela ne fonctionne pas, pb SELinux. Vérification:
  getenforce  -> Si Enforcing, teste temporairement :
  sudo setenforce 0
Si le service se lance, c'est bien un pb SELinux. Solution:
  sudo setenforce 1                                           # Remettre le service
  sudo systemctl start rclone-kdrive.service                  # Reproduire le problème
  sudo ausearch -m avc -ts recent                             # Récupère les logs SELinux
  sudo ausearch -m avc -ts recent | audit2allow -M rclone_local   # Génère une règle autorisant ce comportement
  sudo semodule -i rclone_local.pp                            # Installe la règle
  
Retester le fonctionnement

Programmer le service au démarrage:
  sudo systemctl enable rclone-kdrive.service

Pour supprimer un service:
  systemctl stop <nom service>
  systemctl disable <nom service>
  rm /etc/systemd/system/<nom service>
  rm /usr/lib/systemd/system/<nom service>
  systemctl daemon-reload
  systemctl reset-failed  
``` 



<br><br><br>
## Paramétrage de Steam pour le partage des jeux entre comptes
Solution dérivée de [configuration du répertoire steam](https://steamcommunity.com/discussions/forum/1/4543572701313233470/) et de [source pour la commande setfacl](https://www.baeldung.com/linux/new-files-dirs-default-permission).  

### Configuration de la bibliothèque
Répertoire utilisé comme bibliothèque: /var/steam-library/.  
Création du nouveau groupe `gamers`  
```
sudo groupadd gamers
```
Ajout des utilisateurs au nouveau groupe  
```
sudo usermod -a -G gamers user1
sudo usermod -a -G gamers user2
sudo mkdir /var/steam-library
```
Attribue le propriétaire puis fait en sorte de le conserver sur les nouveaux éléments  
```
sudo chgrp -R gamers /var/steam-library/
sudo chmod -R 2775 /var/steam-library

sudo setfacl -RP -m u::rwX,g:gamers:rwX,o::r /var/steam-library
sudo setfacl -RP -m d:g:gamers:rwX /var/steam-library
```
Quelques commmandes pour références:  
- Pour vérifier les ACL : `getfacl /var/steam-library`  
- Pour supprimer une autorisation (différent d'un ACL, -R = récursif) : `chmod -R o-x`  
- Pour ajouter une autorisation (différent d'un ACL, -R = récursif) : `chmod -R o+x`  
<br>

### Configuration de Steam
Modifier dans steam, pour tous les utilisateurs, le répertoire de stockage des jeux.  




<br><br><br>
## Installation de git
L'installation de git sur le poste principal est très simple grace à l'utilisation de GitHub CLI.  
Le choix du protocole HTTPS permet un clonage effectif des répertoires avec un `git clone <lien https>`  
```
git config --global user.name  "Imasu"
git config --global user.email "user@mail"
brew install gh
gh auth login
```
<br>

Guides synthétiques d'utilisation de git:  
- [Git Push Local Branch to Remote – How to Publish a New Branch in Git](https://www.freecodecamp.org/news/git-push-local-branch-to-remote-how-to-publish-a-new-branch-in-git/).
- [Commandes GIT de base](https://www.hostinger.fr/tutoriels/commandes-git)
<br>

Quelques commandes utiles:  
-`git init` pour initialiser un dépôt local  
-`git add .` pour ajouter tous les fichiers du répertoire au dépôt local  
-`git commit -m "commit message"` pour sauvegarder les changements fait aux fichiers locaux  
<br>
-`git remote add origin <url.git>` pour attacher le dépôt à un serveur distant Git  
-`git remote -v` pour vérifier l'attachement au serveur distant  
<br>
-`git pull` pour synchroniser depuis le serveur distant  
-`git push -u origin main` pour envoyer les modifications sur le serveur distant (il est possible de changer la branche avec la commande `git branch -M main`)  





<br><br><br>
## Installation d'un environnement de développement conteneurisé

### Container Distrobox  
Installation d'une distrobox selon cette commande. Il ne faut pas utiliser la version GUI BOXES qui ne propose pas toutes les options.  
**Il est important de spécifier un chemin HOME dédié pour éviter que les fichiers de l'hôte soient modifiés par ceux du conteneur.**  

Liste de containers [distrobox containers distros](https://github.com/89luca89/distrobox/blob/main/docs/compatibility.md#containers-distros)  

Distributions testées et fonctionnelles (wayland):  
- Fedora : --image quay.io/fedora/fedora-toolbox:latest,  
- Archlinux : --image quay.io/toolbx/arch-toolbox:latest,  
<br>

Exemples avec implémentation du driver nvidia et une isolation renforcée (--unshare-all --init). Attention au répertoire pour le dossier $HOME du conteneur  
```
distrobox create --image quay.io/fedora/fedora-toolbox:latest --name <Name>-FedoraOS --nvidia --unshare-all --home /home/$USER/.containers-home/<Name>-FedoraOS
```

### Paramétrage du container

#### Fonctionnement de vulkan (22/04/2026)
Avec Distrobox + --nvidia, le GPU est bien exposé, mais l’accès au display (X11/Wayland) n’est pas automatique.
KDE Plasma 6 tourne souvent en Wayland, ce qui complique encore plus XCB

Autoriser l’accès X11, sur l’hôte, lancer la commande:  
```
xhost +si:localuser:$(whoami)
```
<br>

#### Paquets à installer
Installation des paquets essentiels : nano, git...  
Sous FEDORA:  
```
  sudo dnf update
  sudo dnf install gcc nano git chromium
```  
- `gcc` : outil de compilation  
- `git` : configuration comme guide supra  
   Rappel, dans les projets, pour éviter la synchronisation de certains fichiers ou répertoires, créer un fichier `.gitignore` avec les paramètrages nécessaires.  
- `chromium` : requis pour disposer des librairies graphiques et pour qu'un navigateur soit actif sur le conteneur (nécessaire par exemple pour la documentation des programmes Rust)  

Optionnel:
- Configuration de `nano` en suivant le guide supra.
<br>

#### Installation des languages
Languages testés:  
- Rust : [Install Rust in Fedora](https://developer.fedoraproject.org/tech/languages/rust/rust-installation.html). Installer via Rustup.  
  * Debugger : `lldb ou mold` à installer séparément.  Il faudra configurer le fichier `.cargo/config.toml` rn conséquence.  
  * Créer un fichier `rustfmt.toml` dans un répertoire `~/.config/rustfmt/` avec les valeurs de formatage à appliquer à tous les programmes Rust [source](https://rust-lang.github.io/rustfmt/?version=v1.8.0&search=).  
  * Rust / Bevy : suivre le [guide d'installation](https://github.com/bevyengine/bevy/blob/latest/docs/linux_dependencies.md). Dépendances Bevy à installer:  
    ```
    sudo dnf install gcc-c++ alsa-lib-devel systemd-devel wayland-devel libxkbcommon-devel
    ```
   * Installation de RustRover (JetBrains):  
       * Depuis la racine du $HOME du container (cd ~/), [suivre la procédure de JetBrains](https://www.jetbrains.com/help/rust/installation-guide.html#standalone)  
       * Il est possible après de créer un symlink vers ~/.local/bin pour pouvoir lancer RustRover directement sans aller dans son répertoire d'installation (/opt/RustRover...)
         ```
         ln -s /opt/RustRover-YYYY.V/bin/rustrover ~/.local/bin/rustrover
         ln -s ~/.local/bin/rustrover ~/.local/bin/RR
         ```
       * Lors de la première connexion, l'enregistrement de la license est nécessaire. Sélectionner la méthode par token.
     <br>
     
- Odin : Installer les packages `odin lldb`. Le dernier correspond au debugger. 
- Go : [install go in arch using Pacman](https://www.bomberbot.com/golang/how-to-install-go-in-arch-linux-using-pacman/). Installation sans difficulté. Pas besoin de mettre à jour le GOPATH. Un répertoire go sera créé avec les packages et binaires associés nécessaires.
- Julia : [install Julia in Arch (wiki Arch)](https://wiki.archlinux.org/title/Julia).  Installation sans difficulté. Il convient de paramétrer le chemin de l'exécutable dans l'extension VSCode [source](https://blog.glcs.io/install-julia-and-vscode#heading-installing-julia-2).
- C++ : [Installation & fonctionnement avec make](https://www.youtube.com/watch?v=VXvPpPCF7E0) ; [fonctionnement avec cmake](https://www.youtube.com/watch?v=DMSROwPyhAE)



<br><br><br>
fin  
