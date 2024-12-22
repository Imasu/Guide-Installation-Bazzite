# Guide d'installation uBlue

D.Bouvier  
<br>
[Documentation Bazzite](https://docs.bazzite.gg)  
[Blog généraliste sur Linux avec des astuces](https://www.linuxtricks.fr/pages/bienvenue-sur-linuxtricks)  
<br><br><br>




## Pré installation

### Type et taille des partitions à créer

|  Partiton          |    Taille          | Type de partition  |
|--------------------|--------------------|--------------------|
|  /boot/efi         |         100 Mo     |        EFI         |
|  /boot             |           1 Go     |        EXT4        |
|  /systemfile       |        > 40 Go     |       BTRFS        |

Détail pour un partitionnement manuel [Fedora Manual Partitioning](https://docs.fedoraproject.org/en-US/fedora-silverblue/installation/)  
<br><br><br>




## Commandes utiles sur une uBlue

### Spécifique à uBlue
Update manuel `ujust update`  
Affiche le contenu du script ujust `ujust --show <script>`  
<br>

### Commandes rpm-ostree d'une Fedora Atomic
Liste des environnements `rpm-ostree status -v`  
Conservation de l'environnement actuel (<n>=0) `sudo ostree admin pin <n>`  
Dé-conservation d'un environnement `sudo ostre admin pin --unpin <n>`  
<br>
Rollback vers le précédent environnement `rpm-ostree rollback`  
<br>
Rechercher un package dans le dépôt ostree `rpm-ostree search <package>`  
Installation d'un package sur la couche de base `rpm-ostree install <package>`  
Désinstallation d'un package sur la couche de base `rpm-ostree uninstall <package>`  
<br>
Suppression d'un package livré par défaut dans la couche de base `rpm-ostree override remove <package>`  
<br><br><br>




## Setup du système

### Secure Boot
Suivre ce guide pour réinstaller le Secure Boot
[Documentation Bazzite - Secure Boot Instructions](https://docs.bazzite.gg/General/Installation_Guide/secure_boot/#method-b-after-installation-method).  
<br>

### Configuration système
Changement du nom du PC `hostnamectl set-hostname <hostname>`  
Modification du menu sous KDE `kmenuedit`  
<br>

### Configuration de BASH
Installation possible de Oh-My-Bash en suivant ce guide [Configurer Bash avec Oh-my-Bash](https://just-sudo-it.be/configurer-et-personnaliser-bash-avec-oh-my-bash/). L'installation via wget fonctionne bien.  
<br>
Dans le fichier `.bashrc`  
1. Thème sélectionné: `powerline`  
2. Corriger un problème d'autocompletion par ajout en fin de .bashrc de `complete -d cd` ([Source issue 448](https://github.com/ohmybash/oh-my-bash/issues/448)).  
3. Prise en compte des modifications `source .bashrc`  
<br>
La commande `shopt -s globstar` permet de rendre la chaine `**` équivalente à 'tous les répertoires fils' dans les commandes shell.  
Exemple `ls **/*/*.txt`. Ne fonctionne que dans les sous-répertoire de '$HOME'.  
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
Ajouter pour toutes les applications les permissions suivantes
```
Accélaration GPU : enable
```
<br>

#### Applications intéressantes  
A installer sur la session System pour éviter les doublons des packages de base et gagner de la place  
- Betterbird : remplaçant de Thunderbird car intègre des correctifs que n'a pas la version originale  
- Bitwarden : l'extension web est suffisante dans la pratique  
- SaveDesktop : Sauvegarde du bureau linux pour restoration (ne fonctionne pas sur une atomic)  
- Apostrophe : Outil pour rédiger les fichiers ReadMe Github  
<br><br>


### AppImage
Autre service d'applications notament pour celles achetées.  
Gestion à partir de l'application `Gear Level`  

#### Applications intéressantes  
- Cider (achetée via [itch.io](https://itch.io))  
<br><br><br>




## Modding du système GNOME

### Extensions supplémentaires
Liste d'extensions à installer  
- Dash to Dock  
- Extension List  
- Media Label and Controls  
- OpenWeather Refined
<br>

### Application du thème [WhiteSur](https://github.com/vinceliuice/WhiteSur-gtk-theme) 
1. Créer une distrobox pour la compilation du theme avec un home folder distinct
`distrobox create -i "fedora:latest" -n "sys-deskcustom" -H "$HOME/.local/share/containers/home-folder/sys-deskcustom"`
2. Dans la distrobox, installer toutes les dépendances demandées : `sudo dnf install <packages>`
3. Téléchager le thème dans un répertoire temporaire et l'installer avec les commandes
```
./install.sh -l
./tweaks.sh -F
```
4. Copier le contenu des répertoires suivants dans leur homologue du système hôte
```
$HOME/.local/share/containers/home-folder/sys-deskcustom/.config/gtk-4.0  ->  $HOME/.config/gtk-4.0
$HOME/.local/share/containers/home-folder/sys-deskcustom/.themes          ->  $HOME/.local/share/themes
```
5. Installer les Flatpaks générés par l'installation  
Le script d'installation a généré des fichiers flatpak dans le répertoire `$HOME/.local/share/containers/home-folder/sys-deskcustom/.cache/pakitheme`.  
Sur le système hôte, aller dans ce répertoire et pour chaque sous répertoire installer le flatpak en mode system avec par exemple la commande  
```
flatpak --system install WhiteSur-Light/org.gtk.Gtk3theme.WhiteSur-Light-x86_64.flatpak
```
6. Paramétrer les permissions Flatpak à partir de FlatSeal  
Ajouter dans la section `Filesystem` pour toutes les applications les permissions suivantes  
```
/var/home/dbouvier/.local/share/icons/*:ro
/usr/share/icons/*:ro
/var/home/dbouvier/.local/share/themes/*:ro
xdg-config/gtk-4.0:ro
xdg-config/gtk-3.0:ro
```
7. Les icônes et curseurs sont à déposer dans le répertoire `/home/dbouvier/.local/share/icons`


<br><br><br>
## Modding du système KDE
Le modding du bureau KDE est particulier sur les distribution uBlue. **Il ne faut pas installer les thèmes KDE à partir de l'installateur KDE de base mais les installer manuellement** dans son répertoire Home.  
Sauvegarde du bureau après paramètrage disponible sous `One Drive`  

[Documentation Bazzite - Customisation du bureau KDE](https://docs.bazzite.gg/General/Desktop_Environment_Tweaks/)  
[Bonne ressource sur le modding KDE](https://itsfoss.com/properly-theme-kde-plasma/)

### Installation des thèmes
1. Sauvegarde du thème téléchargé depuis le [KDE Store](https://store.kde.org/browse/) dans le répertoire `~/.local/share/plasma/`  
2. Ouvrir les paramètres système et sélectionner un par un les composants à appliquer  
<br>

### Localisation des composants KDE extraits
- Thème Global: `~/.local/share/plasma/look-and-feel/`  
- Thème Plasma: `~/.local/share/plasma/desktoptheme/`  
- Icônes et curseurs: `~/.local/share/icons/` (différent de la doc)  
Installation à partir d'une archive .tar.gz  

#### Thème du Login Manager (SDDM)
Utiliser `Discover` pour installer les thèmes SDDM.  
Ces thèmes peuvent également être mis en sur-couche (/!\ risqué) s'ils sont disponibles sous forme de package RPM avec `rpm-ostree`  
<br>

#### Autorisation des Flatpaks à utiliser les thèmes
Certains Flatpaks, ayant des problèmes avec les curseurs, nécessitent l'accès au filesystem. Leur octroyer individuellement ou globalement à partir de `Flatseal`  
Exemple: `~/.icons/:ro` dans la catégorie "Filesystem"  
<br>

#### Thème requérant `kvantum`  
Installer le composant en sur-couche `rpm-ostree install kvantum`  
<br>

#### Références pour les thèmes
Icones : Nova7 (préféré), Nordzy, Fluent  




<br><br><br>
## Installation d'une machine virtuelle Windows avec copier/coller et taille de bureau ajustable
Suivre les deux guides suivants. Une version au 26/11/2024 est sauvegardée dans le github.  
- [How Do I Properly Install KVM on Linux](https://sysguides.com/install-kvm-on-linux)  
- [How to Properly Install a Windows 11 Virtual Machine on KVM](https://sysguides.com/install-a-windows-11-virtual-machine-on-kvm)  
<br>
[Lien vers les drivers Virtuo (iso & exe)](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.266-1/)  
[Lien vers les spice tools](https://www.spice-space.org/download/windows/spice-guest-tools/spice-guest-tools-latest.exe)  
<br>
Il ne sert à rien d'activer le IOMMU, mon processeur actuel ne permet pas un pci pass-through complet... donc pas de cristal glass...  
<br>
La configuration des processeurs est incorrecte par défaut. Il faut définir manuellement la topologie avec Sockets 1, Coeurs = CPU logiques, Chaînes 1.  




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

### Installation de GoLang dans le container Arch
Référence [install go in arch using Pacman](https://www.bomberbot.com/golang/how-to-install-go-in-arch-linux-using-pacman/)  

#### Installation des paquets
Installation des paquets essentiels nano git code et le langage go  
```
sudo pacman -Syu
sudo pacman -S nano git code go
```
Les dépendances go iront se loger dans un répertoire `go` du dossier $USER.  
Il est possible de créer un autre répertoire, exemple `go-projets` pour y stocker ses programmes.  
Par projet, il est recommandé de créer ces trois sous-répertoires: `src, pkg, bin`.  
<br>

[Commandes GIT de base](https://www.hostinger.fr/tutoriels/commandes-git)  
```
git config --global user.name  "Imasu"
git config --global user.email "d2bouv@gmail.com"

```
<br>
L'installation de Oh-My-Bash est possible en suivant le guide supra.  Pour rendre le script exécutable si téléchargement seul, utiliser la commande `chmod u+x install.sh`
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






<br><br><br>
## Installation d'un environnement de développement sur le système hôte avec gestion de containers
Pas le choix au final le plus avisé -> il est préférable d'installer l'environnement de dév (VS-Code, git, langage directement dans une distrobox  
Installation de VS-Code par Flatpak puis utilisation de conteneurs pour les développements.  
Puisque sous Bazzite, utilisation d'une distrobox car mise à jour automatique de celle-ci par l'intermédiaire des commmandes de mise à jour.  

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






fin  
