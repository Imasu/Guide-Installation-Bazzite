# Guide d'installation uBlue

D.Bouvier  
<br>

[Documentation Bazzite](https://docs.bazzite.gg)  
<br><br>

## Pré installation

### Type et taille des partitions à créer

|  Partiton          |    Taille          | Type de partition  |
|--------------------|--------------------|--------------------|
|  /boot/efi         |         100 Mo     |        EFI         |
|  /boot             |           1 Go     |        EXT4        |
|  /systemfile       |        > 40 Go     |       BTRFS        |

Détail pour un partitionnement manuel [Fedora Manual Partitioning](https://docs.fedoraproject.org/en-US/fedora-silverblue/installation/)  
<br><br>

## Commandes utiles sur une uBlue

### Spécifique à uBlue
Update manuel `ujust update`  
<br>

### Fedora Atomic
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
<br><br>

## Setup du système

### Secure Boot
Suivre ce guide pour réinstaller le Secure Boot
[Documentation Bazzite - Secure Boot Instructions](https://docs.bazzite.gg/General/Installation_Guide/secure_boot/#method-b-after-installation-method).  
<br>

### Configuration système
Changement du nom du PC `hostnamectl set-hostname <hostname>`  
Modification du menu KDE `kmenuedit`  
<br><br>

## Système d'applications

### Flatpak

#### Quelques commandes:  
- Liste les sessions `flatpak remotes`  
- Liste les flatpack d'une session `flatpack remote-ls <remote>`  
- Installation et désinstallation sur la session utilisateur `flatpak install <remote> <package>` / `flatpak uninstall <remote> <package>`  
- Rechercher un package `flatpak search <package>`  
- Permissions d'un package `flatpak info --show-permissions <package>`

#### Applications intéressantes  
A installer sur la session System pour éviter les doublons des packages de base et gagner de la place  
- Bitwarden  
- SaveDesktop : Sauvegarde du bureau linux pour restoration  
- Apostrophe : Outil pour rédiger les fichiers ReadMe Github  
<br><br>

### AppImage
Autre service d'applications notament pour celles achetées.  
Gestion à partir de l'application `Gear Level`.  

#### Applications intéressantes  
- Cider (achetée via [itch.io](https://itch.io))  
<br><br>

## Modding du système KDE
Le modding du bureau KDE est particulier sur les distribution uBlue. **Il ne faut pas installer les thèmes KDE à partir de l'installateur KDE de base mais les installer manuellement** dans son répertoire Home.  
Sauvegarde du bureau après paramètrage disponible sous `One Drive`  

[Documentation Bazzite - Customisation du bureau KDE](https://docs.bazzite.gg/General/Desktop_Environment_Tweaks/)  
[Bonne ressource sur le modding KDE](https://itsfoss.com/properly-theme-kde-plasma/)

### Installation des thèmes
1. Sauvegarde du thème téléchargé depuis le [KDE Store](https://store.kde.org/browse/) dans le répertoire `~/.local/share/plasma/`  
2. Ouvrir les paramètres système et sélectionner un par un les composants à appliquer  

#### Localisation des composants KDE extraits
- Thème Global: `~/.local/share/plasma/look-and-feel/  
- Thème Plasma: `~/.local/share/plasma/desktoptheme/`  
- Icônes et curseurs: `~/.local/share/icons/` (différent de la doc)  
Installation à partir d'une archive .tar.gz

#### Thème du Login Manager (SDDM)
Utiliser `Discover` pour installer les thèmes SDDM.
Ces thèmes peuvent également être mis en sur-couche (/!\ risqué) s'ils sont disponibles sous forme de package RPM avec `rpm-ostree`  

#### Autorisation des Flatpaks à utiliser les thèmes
Certains Flatpaks, ayant des problèmes avec les curseurs, nécessitent l'accès au filesystem. Leur octroyer individuellement ou globalement à partir de `Flatseal`  
Exemple: `~/.icons/:ro` dans la catégorie "Filesystem"  

#### Thème requérant `kvantum`  
Installer le composant en sur-couche `rpm-ostree install kvantum`  

#### Références pour les thèmes
Icones : Nova7 (préféré), Nordzy, Fluent
<br><br>

## Installation d'une machine virtuelle Windows avec copier/coller et taille de bureau ajustable
Suivre les deux guides suivants. Une version au 26/11/2024 est sauvegardée dans le github.  
- [How Do I Properly Install KVM on Linux](https://sysguides.com/install-kvm-on-linux)
- [How to Properly Install a Windows 11 Virtual Machine on KVM](https://sysguides.com/install-a-windows-11-virtual-machine-on-kvm)  

<br>
En plus, il convient de vérifier que le CPU a le IOMMU activé:  
Run the following command  

```
dmesg | grep -i -e DMAR -e IOMMU
```
  
Si ce n'est pas le cas, lancer:
```
sudo rpm-ostree kargs \
  --append-if-missing="intel_iommu=on" \
  --append-if-missing="iommu=pt" \
  --append-if-missing="rd.driver.pre=vfio_pci" \
  --reboot
```

A noter que mon processeur actuel ne permet pas un pass-through complet...  
<br><br>

## Installation d'un environnement de développement
Choix d'une installation de VS-Code par Flatpak puis utilisation de conteneurs pour les développements.  
Puisque sous Bazzite, utilisation d'une distrobox car mise à jour automatique de celle-ci par l'intermédiaire des commmandes de mise à jour.  

### Container Distrobox  
Installation d'une distrobox selon cette commande. Il ne faut pas utiliser la version GUI BOXES qui ne propose pas toutes les options.
Exemple pour une image Arch-Toolbox (optimisée pour un container) avec implémentation du driver nvidia et une isolation renforcée (--unshare-all --init).  
**Il est important de spécifier un chemin HOME dédié pour éviter que les fichiers de l'hôte soient modifiés par ceux du conteneur.**  

Liste de containers [distrobox containers distros](https://github.com/89luca89/distrobox/blob/main/docs/compatibility.md#containers-distros)

```
distrobox create --image archlinux:latest --name Arch-DevEnv --nvidia --unshare-all --init --home /home/Damien/.local/share/containers-home/Arch-DevEnv
```  

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

#### Rend visible podman depuis VS Code sous flatpak  
```
mkdir -p ${HOME}/.var/app/com.visualstudio.code/data/node_modules/bin
ln -sf /app/bin/host-spawn ${HOME}/.var/app/com.visualstudio.code/data/node_modules/bin/podman
```

#### Configuration de VS Code  
1. Lancer VS Code
2. Installer l'extension `Dev Containers`
3. `CTRL+,` pour ouvrir l'éditeur de paramètres
4. Rechercher `docker path` et remplacer la valeur par `podman`

#### Configuration de l'extension Dev Containers
Créer un fichier de configuration dans le répertoire `${HOME}/.config/containers/containers.conf`  
```
[containers]
env = ["BUILDAH_FORMAT=docker"]
label = false
userns = "keep-id"
```

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

### Installation de GoLang dans le container Arch
Référence : [install go in arch using Pacman](https://www.bomberbot.com/golang/how-to-install-go-in-arch-linux-using-pacman/)  

#### Installation des paquets
1. Mise à jour du système:
```
sudo pacman -Syu
```
2. Installation de GoLang & Nano :
```
sudo pacman -S go nano
```

#### Mise en place de l'environnement de travail:
1. création d'un répertoire pour les projets :
```
mkdir -p $HOME/go-projets
```
2. ajouter la variable d'environnement GOPATH dans le fichier `.bashrc` qui se situe sous $HOME:
```
export GOPA TH=$HOME/go-projets
```

#### Organisation des projets 
Par projet, il est recommandé de créer ces trois sous-répertoires: `src, pkg, bin`  
<br>

### Utilisation de Github

#### Première configuration de Github
Initialisation de git sur le système (ici le container):
```
git config --global user.name  "Imasu"
git config --global user.email "d2bouv@gmail.com"
```
  
#### Clonage d'un repo
Pour récupérer un projet maintenu sous Github, il suffit de ce mettre dans le répertoire parent et de lancer cette commande:
```
git clone https://github.com/imasu/mon_repo monrépertoirecible
```
Si pas de répertoire cible, le nom du repo sera utilisé.  

#### Paramétrage de Git sous VS-Code
Sous KDE, si VS-Code affiche un message d'erreur sur la gestion du portefeuille de clé.
> You're running in a KDE environment but the OS keyring is not available for encryption. Ensure you have kwallet running.

Ajouter dans le fichier de configuration `${HOME}/.vscode/argv.json` l'entrée suivante (raccourci depuis VS-Code `Ctrl+Shift+P` puis `Preferences : Configure Runtime Arguments`):
```
"password-store": "gnome-libsecret"
```




fin  
