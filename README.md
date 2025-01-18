# Guide d'installation Bazzite

Synthèse de mon installation de Bazzite Gnome Nvidia 
<br>
[Documentation Bazzite](https://docs.bazzite.gg)  
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
<br><br><br>




## Setup du système

### Secure Boot
Suivre ce guide pour réinstaller le Secure Boot
[Documentation Bazzite - Secure Boot Instructions](https://docs.bazzite.gg/General/Installation_Guide/secure_boot/#method-b-after-installation-method).  
<br>

### Configuration système
Changement du nom du PC `hostnamectl set-hostname <hostname>`.  
<br>

### Configuration de BASH
Installation possible de Oh-My-Bash en suivant ce guide [Configurer Bash avec Oh-my-Bash](https://just-sudo-it.be/configurer-et-personnaliser-bash-avec-oh-my-bash/). L'installation via wget fonctionne bien.  
<br>
Dans le fichier `.bashrc`:  
1. Thème sélectionné: `powerline-multiline`, avec la palette `VS Code`,  
2. Recopier les lignes originales du `.bashrc` de Bazzite dans la version générée par Oh-My-Bash. Nécessaire pour que `Brew` fonctionne,  
3. Corriger un problème d'autocompletion par ajout **en fin** de .bashrc de `complete -d cd` ([Source issue 448](https://github.com/ohmybash/oh-my-bash/issues/448)),  
4. Prise en compte des modifications par la commande `source .bashrc`.  
<br>
La commande `shopt -s globstar` permet de rendre la chaine `**` équivalente à 'tous les répertoires fils' dans les commandes shell.  
Exemple `ls **/*/*.txt`. Ne fonctionne que dans les sous-répertoire de '$HOME'.  
<br>
La commande `gsettings set org.gnome.desktop.interface accent-color 'blue'` permet de modifier la couleur d'affichage du menu BAZZITE dans le terminal.  
<br><br>

### Configuration de NANO
Modification du fichier de configuration `/etc/nanorc` :  
- Affichage du numéro de la ligne : `set linenumbers`  
- Gestion de la souris: `set mouse`  
- Thèmes: `include /usr/share/nano/*.nanorc` et `include /usr/share/nano/extra/*.nanorc`
- Key bindings: décommenter les raccourcis nécessaires : `Crl+X, C, V, Q, S, F, G, Z, Y`
<br><br><br>




## Setup des applications

### Flatpak
#### Quelques commandes:  
- Liste les sessions `flatpak remotes`  
- Liste les flatpack d'une session `flatpack remote-ls <remote>`  
- Installation et désinstallation sur la session utilisateur `flatpak install <remote> <package>` / `flatpak uninstall <remote> <package>`  
- Rechercher un package `flatpak search <package>`  
- Permissions d'un package `flatpak info --show-permissions <package>`  
<br>

#### Paramétrage pour toutes les applications
Ajouter pour toutes les applications les permissions suivantes:  
```
Accélaration GPU : enable
```
<br>

#### Suppression des applications installées par défaut
Certaines applications installées par défaut peuvent être supprimées. Quelques commentaires associés:
- Firefox : le répertoire `$HOME/.mozilla` peut être supprimé.  
<br>

#### Applications intéressantes  
A installer sur la session System pour éviter les doublons des packages de base et gagner de la place:  
- Brave
- Betterbird : remplaçant de Thunderbird car intègre des correctifs que n'a pas la version originale,  
- Bitwarden : l'extension web est suffisante dans la pratique,  
- SaveDesktop : Sauvegarde du bureau linux pour restoration ; ne fonctionne pas sur une atomic :(,  
- Apostrophe : Outil pour rédiger les fichiers ReadMe Github.  
<br><br>


### AppImage
Autre service d'applications notament pour celles achetées.  
Gestion à partir de l'application `Gear Level`.  
Créer un répertoire `~/.AppImages` pour les stocker.  

#### Applications intéressantes  
- Cider (achetée via [itch.io](https://itch.io)).  
<br><br>


### Brew
Applications et services sans GUI. Permet l'installation d'applications utilisées dans les lignes de commande.   

#### Applications intéressantes
- OneDrive (couplé à une AppImage pour le GUI).  
**/!\ Finalement moins pratique que l'utilisation de la fonctionnalité de comptes en lignes de Gnome avec Microsoft 365 car cette application télécharge tous les fichiers sous OneDrive.**  
En alternative, il y a également "onedriver" qui présente les mêmes fonctionnalités.
[Processus d'installation One Drive en mode application](https://universal-blue.discourse.group/t/installing-onedrive-in-fedora-silverblue-bluefin-via-brew-gui-and-system-tray-icon/1071).  L'installation en mode service ne fonctionnera pas avec le GUI AppImage.  
Fichier de config OneDrive, sélectionner ces options: `download_only = "false"`, `skip_symlinks = "true"`, `cleanup_local_files = "true"`  
<br><br><br>






## Modding du système GNOME

### Extensions supplémentaires
Liste d'extensions à installer:  
- Dash to Dock,  
- Extension List,  
- OpenWeather Refined,  
- Hide Top Bar (désactiver les options Sensitivity -> `In the above case, also show panel when fullscreen`, Intellihide -> `only when the active window takes the space`).  
<br>

En standard sur Bazzite: AppIndicator and KStatusNotifierItem Support, Blur my shell, Caffeine, Hot Edge, Just Perfection, Logo Menu, Tiling Shell, User Themes.  
- Just Perfection: dans comportement sélectionner `Bureau` pour l'option `Etat de démarrage`  
- L'application Hot Edge est à désactiver pour éviter de basculer sur les autres bureaux lorsque la souris se déplace rapidemment vers le bas de l'écran.  
<br>

### Application du thème [WhiteSur](https://github.com/vinceliuice/WhiteSur-gtk-theme) 
1. Créer une distrobox pour la compilation du theme avec un home folder distinct  
`distrobox create -i "fedora:latest" -n "sys-deskcustom" -H "$HOME/.local/share/containers/home-folder/sys-deskcustom"`
2. Dans la distrobox, installer `git` et toutes les dépendances demandées : `sudo dnf install git <packages>`  
3. Dans la distrobox, téléchager le thème et l'installer avec les commandes  
```
./install.sh -l
./tweaks.sh -F
```
4. Depuis la console du système hôte, copier le contenu des répertoires suivants dans leur homologue du système hôte  
```
cp -r $HOME/.local/share/containers/home-folder/sys-deskcustom/.config/gtk-4.0 $HOME/.config/
cp -r $HOME/.local/share/containers/home-folder/sys-deskcustom/.themes  $HOME/.local/share/themes
```
5. Depuis la console du système hôte, modifier les deux fichiers liens qui pointent vers le répertoire du container  
```
ln -s -f $HOME/.config/gtk-4.0/gtk-Dark.css $HOME/.config/gtk-4.0/gtk.css
ln -s -f $HOME/.config/gtk-4.0/gtk-Dark.css $HOME/.config/gtk-4.0/gtk-dark.css
```
7. Installer les Flatpaks générés par l'installation  
Le script d'installation a généré des fichiers flatpak dans le répertoire `$HOME/.local/share/containers/home-folder/sys-deskcustom/.cache/pakitheme`.  
Depuis la console du système hôte, aller dans ce répertoire et pour chaque sous répertoire installer le flatpak en mode system:  
```
flatpak --system install WhiteSur-Dark/org.gtk.Gtk3theme.WhiteSur-Dark-x86_64.flatpak
flatpak --system install WhiteSur-Dark-solid/org.gtk.Gtk3theme.WhiteSur-Dark-solid-x86_64.flatpak
flatpak --system install WhiteSur-Light/org.gtk.Gtk3theme.WhiteSur-Light-x86_64.flatpak
```
7. Paramétrer les permissions Flatpak à partir de FlatSeal  
Ajouter dans la section `Filesystem` pour toutes les applications les permissions suivantes  
```
/var/home/<user name>/.local/share/icons/*:ro
/var/home/<user name>/.local/share/themes/*:ro
xdg-config/gtk-4.0:ro
xdg-config/gtk-3.0:ro
```
8. Les icônes et curseurs [WhiteSur Gtk Theme](https://www.gnome-look.org/p/1403328/) sont à déposer dans le répertoire `$HOME/.local/share/icons`  
9. Le thème est à appliquer depuis Gnome Tweaks  
10. Supprimer le container `distrobox rm sys-deskcustom`, le répertoire `$HOME/.local/share/containers/home-folder/sys-deskcustom`, le réperoirte `WhiteSur-gtk-theme` créé lors du processus d'installation.  





<br><br><br>
## Installation d'une machine virtuelle Windows avec copier/coller et taille de bureau ajustable
Suivre dans les lignes les deux guides suivants. Une version au 26/11/2024 est sauvegardée dans le github.
- [How Do I Properly Install KVM on Linux](https://sysguides.com/install-kvm-on-linux)  
- [How to Properly Install a Windows 11 Virtual Machine on KVM](https://sysguides.com/install-a-windows-11-virtual-machine-on-kvm)  
<br>

Remarques:  
- L'image de Bazzite inclut maintenant nativement les packages de virtualisation (libvirt, qemu...), il n'y a plus rien à mettre en surcouche -> `ujust setup-virtualization`.  
- Il est nécessaire d'activer VFIO /IOMMU pour bénéficier de meilleures performances. Pas de procédure fonctionnelle de CPU pass-through pour l'instant avec un iGPU... donc pas de cristal glass...  
- Il est préférable de ne pas créer les services libvirtd individuels tant que Bazzite ne le propose pas nativement (le faire ne pose pas de problème cependant).  
- La configuration de KVM proposée n'est pas optimale pour mon PC. Configuration optimisée: [Configuration KVM Windows](https://github.com/Imasu/Guide-Installation-uBlue/blob/main/KVM%20Settings).  

<br>
[Lien vers les drivers Virtuo (iso & exe)](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/)  
[Lien vers les spice tools](https://www.spice-space.org/download/windows/spice-guest-tools/spice-guest-tools-latest.exe)  
<br>





<br><br><br>
## Installation d'un environnement de développement conteneurisé
Choix le plus simple et avisé !!  

### Container Distrobox  
Installation d'une distrobox selon cette commande. Il ne faut pas utiliser la version GUI BOXES qui ne propose pas toutes les options.  
Exemple pour une image Arch-Toolbox (optimisée pour un container) avec implémentation du driver nvidia et une isolation renforcée (--unshare-all --init).  
**Il est important de spécifier un chemin HOME dédié pour éviter que les fichiers de l'hôte soient modifiés par ceux du conteneur.**  

Liste de containers [distrobox containers distros](https://github.com/89luca89/distrobox/blob/main/docs/compatibility.md#containers-distros)  
Exemple : attention au répertoire pour le dossier $HOME du conteneur  
```
distrobox create --image archlinux:latest --name Arch-DevEnv --nvidia --unshare-all --init --home /home/$USER/.local/share/containers/home-folder/Arch-DevEnv
```
<br>

### Paramétrage du container Arch

#### Installation des paquets
Installation des paquets essentiels
```
sudo pacman -Syu
sudo pacman -S nano git code
```  
<br>

Paramétrage de base de Git [Commandes GIT de base](https://www.hostinger.fr/tutoriels/commandes-git)  
```
git config --global user.name  "Imasu"
git config --global user.email "@gmail.com"
```
Dans les projets, pour éviter la synchronisation de certains fichiers ou répertoires, créer un fichier `.gitignore` avec les paramètrages nécessaires.  
<br>

#### Configuration du shell
Installation de `Oh-My-Bash` en suivant le guide supra. Thèmes à utiliser: `agnoster`. `powerline-multiline`, avec la palette `Tokyo Night Moon`
Ajouter la commande `cd ~\` en dernière ligne pour démarrer dans le répertoire $HOME du container.  
<br>
Configuration de `nano` en suivant le guide supra.  
<br>

#### Mise en oeuvre de code & git
**Sous environnement GNOME**
1. Installer en plus `gnome-keyring`
2. Lancer VS-Code, sur l'écran d’accueil, sélectionner 'Clone Git Repository...' et suivre les instructions. Tout se met ensuite en place... 
<br>

**Sous KDE**
Lors de l'utilisation de git sous VS-Code, si sous KDE, VS-Code affiche un message d'erreur sur la gestion du portefeuille de clé.
> You're running in a KDE environment but the OS keyring is not available for encryption. Ensure you have kwallet running.  

Ajouter dans le fichier de configuration `${HOME}/.vscode/argv.json` l'entrée suivante (raccourci depuis VS-Code `Ctrl+Shift+P` puis `Preferences : Configure Runtime Arguments`):
```
"password-store": "gnome-libsecret"
```
<br>

#### Installation des langages
Suivre les wiki Arch:  
- Odin : Installer les packages `odin lldb`. Le dernier correspond au debugger.  
- Rust : [install Rust in Arch (wiki Arch)](https://wiki.archlinux.org/title/Rust). Installer les packages `rustup` et `sccache`. Suivre le guide associé avec l'installation de la toolchain, l'optimisation de la compilation CPU et des temps de compilation par création du fichier `~/.cargo/config.toml`.  
- Go : [install go in arch using Pacman](https://www.bomberbot.com/golang/how-to-install-go-in-arch-linux-using-pacman/). Installation sans difficulté. Pas besoin de mettre à jour le GOPATH. Un répertoire go sera créé avec les packages et binaires associés nécessaires.
- Julia : [install Julia in Arch (wiki Arch)](https://wiki.archlinux.org/title/Julia).  Installation sans difficulté. Il convient de paramétrer le chemin de l'exécutable dans l'extension VSCode [source](https://blog.glcs.io/install-julia-and-vscode#heading-installing-julia-2).  




<br><br><br>
## Installation d'un environnement de développement sur le système hôte avec gestion de containers
Installation de VS-Code par Flatpak puis utilisation de conteneurs pour les développements.  
Au final pas le choix le plus avisé -> il est préférable d'installer l'environnement de dév (VS-Code, git, langage directement dans une distrobox)  


### Container Distrobox  
Cf supra.  
<br>

### Configuration VS Code
Installation de l'environnement en suivant ce guide [VSCode + Dev Containers and Toolbx/Distrobox setup for Fedora Silverblue](https://gist.github.com/lbssousa/bb081e35d483520928033b2797133d5e)  

#### Installation de VS-Code par flatpak
Installation  
```
flatpak search com.visualstudio.code  
flatpak --user install flathub com.visualstudio.code
```

Configuration du flatpak  
A partir d'une configuration standard (flatseal)  
```
flatpak --user override --env HOST_DISPLAY="$DISPLAY" --env HOST_SHELL="$SHELL" --env HOST_SSH_AUTH_SOCK="$SSH_AUTH_SOCK" com.visualsudio.code
??? flatpak override --user --filesystem=xdg-run/podman com.visualstudio.code ???
flatpak override --user --filesystem=/tmp com.visualstudio.code
```
<br>

#### Rend visible podman depuis VS Code sous flatpak  
```
mkdir -p ${HOME}/.var/app/com.visualstudio.code/data/node_modules/bin
ln -sf /app/bin/host-spawn ${HOME}/.var/app/com.visualstudio.code/data/node_modules/bin/podman
```
<br>

#### Configuration de VS Code  
1. Lancer VS Code
2. Installer l'extension `Dev Containers`
3. `CTRL+,` pour ouvrir l'éditeur de paramètres
4. Rechercher `docker path` et remplacer la valeur par `podman`
<br>

#### Configuration de l'extension Dev Containers
Créer un fichier de configuration dans le répertoire `${HOME}/.config/containers/containers.conf`  
```
[containers]
env = ["BUILDAH_FORMAT=docker"]
label = false
userns = "keep-id"
```
<br>

#### Configuration des containers distrobox (pour VS Code sous flatpak)
Pour **chacun des containers distrobox**  
1. Créer un fichier json dans le répertoire `${HOME}/.var/app/com.visualstudio.code/config/Code/User/globalStorage/ms-vscode-remote.remote-containers/nameConfigs/${YOUR_DISTROBOX_CONTAINER_NAME}.json`
```
{
  "remoteUser": "${localEnv:USER}",
  "settings": {
    "dev.containers.copyGitConfig": false,
    "dev.containers.gitCredentialHelperConfigLocation": "none"
  },
  "terminal.integrated.profiles.linux": {
    "distrobox": {
      "path": "${localEnv:SHELL}",
      "args": [
        "-l"
      ]
    },
    "toolbx": {
      "path": "/usr/sbin/capsh",
      "args": [
        "--caps=",
        "--",
        "-c",
        "exec \"\$@\"",
        "/bin/sh",
        "${localEnv:SHELL}",
        "-l"
      ]
    }
  },
  "terminal.integrated.defaultProfile.linux": "distrobox",
  "remoteEnv": {
    "COLORTERM": "${localEnv:COLORTERM}",
    "DBUS_SESSION_BUS_ADDRESS": "${localEnv:DBUS_SESSION_BUS_ADDRESS}",
    "DESKTOP_SESSION": "${localEnv:DESKTOP_SESSION}",
    "DISPLAY": "${localEnv:HOST_DISPLAY}",
    "LANG": "${localEnv:LANG}",
    "SHELL": "${localEnv:HOST_SHELL}",
    "SSH_AUTH_SOCK": "${localEnv:HOST_SSH_AUTH_SOCK}",
    "TERM": "${localEnv:TERM}",
    "VTE_VERSION": "${localEnv:VTE_VERSION}",
    "XDG_CURRENT_DESKTOP": "${localEnv:XDG_CURRENT_DESKTOP}",
    "XDG_DATA_DIRS": "${localEnv:XDG_DATA_DIRS}",
    "XDG_MENU_PREFIX": "${localEnv:XDG_MENU_PREFIX}",
    "XDG_RUNTIME_DIR": "${localEnv:XDG_RUNTIME_DIR}",
    "XDG_SESSION_DESKTOP": "${localEnv:XDG_SESSION_DESKTOP}",
    "XDG_SESSION_TYPE": "${localEnv:XDG_SESSION_TYPE}"
  }
}
```

2. Créer un répertoire pour les données VS-Code dans le container avec le code
```
sudo mkdir /.vscode-server
sudo chown ${USER}:${USER} /.vscode-server
ln -sf /.vscode-server ${HOME}/.vscode-server
sudo chmod 755 /root
sudo ln -sf /.vscode-server /root/.vscode-server
```





<br><br><br>
## Paramétrage de Steam pour le partage des jeux entre comptes
Source: [configuration du répertoire steam](https://steamcommunity.com/discussions/forum/1/4543572701313233470/)

### Configuration de la bibliothèque
Répertoire utilisé comme bibliothèque: /var/steam-library/.  
```
sudo mkdir /var/steam-library
sudo groupadd gamers
sudo chgrp gamers /var/steam-library/
sudo chmod -R 770 /var/steam-library/
????  sudo chmod g+s /var/steam-library/
#don't forget to replace user1.users2,etc. with your Linux users
sudo usermod -a -G gamers user1
sudo usermod -a -G gamers user2
```
<br>

### Configuration de Steam
Modifier dans steam, pour tous les utilisateurs, le répertoire de stockage des jeux.  





<br><br><br>
fin  
