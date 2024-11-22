# Guide d'installation uBlue

D.Bouvier
<br><br>

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

### Fedora Atomic
Liste des environnements `rpm-ostree status -v`  
Conservation de l'environnement actuel (<n>=0) `sudo ostree admin pin <n>`  
Dé-conservation d'un environnement `sudo ostre admin pin --unpin <n>`  
>
Rollback vers le précédent environnement `rpm-ostree rollback`  
>
Rechercher un package dans le dépôt ostree `rpm-ostree search <package>`  
Installation d'un package sur la couche de base `rpm-ostree install <package>`  
Désinstallation d'un package sur la couche de base `rpm-ostree uninstall <package>`  
>
Suppression d'un package livré par défaut dans la couche de base `rpm-ostree override remove <package>`  
<br><br>


## Setup du système

### Secure Boot
Suivre ce guide pour réinstaller le Secure Boot
[Documentation Bazzite - Secure Boot Instructions](https://docs.bazzite.gg/General/Installation_Guide/secure_boot/#method-b-after-installation-method)

### Host name
Commande `hostnamectl set-hostname <hostname>`

### Flatpak

#### Quelques commandes:  
- Liste les sessions `flatpak remotes`
- Liste les flatpack d'une session `flatpack remote-ls <remote>`  
- Installation et désinstallation sur la session utilisateur `flatpak install <remote> <package>` / `flatpak uninstall <remote> <package>`
- Rechercher un package `flatpak search <package>`
>   
#### Applications intéressantes  
- Bitwarden
- SaveDesktop : Sauvegarde du bureau linux pour restoration
- Apostrophe : Outil pour rédiger les fichiers ReadMe Github



<br><br>
