"use client"

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ChevronDown,
  ChevronRight,
  Sword,
  NetworkIcon as Necklace,
  Shirt,
  Footprints,
  PenIcon as Pants,
  BellRingIcon as Ring,
  Gem,
  Axe,
  ShieldIcon,
  Flame,
  Sparkles,
  Compass,
  Scroll,
  Edit,
  Check,
  X,
  ExternalLink,
  Trash2,
  Plus,
  Maximize2,
  Minimize2,
  Download,
  ArrowUp,
  ArrowDown,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/components/user-auth-provider"

// Types pour notre tableau d'équipement
type EquipmentItem = {
  name: string
  color: string
  itemId: string // ID pour le lien vers l'item réel
  quality:
    | "common"
    | "uncommon"
    | "rare"
    | "epic"
    | "legendary"
    | "artifact"
    | "bis-nm"
    | "bis-hm"
    | "non-bis-hm"
    | "bis-mm"
    | "non-bis-mm"
}

type PlayerEquipment = {
  id: number
  joueur: string
  classe: string // Classe du personnage
  specialisation: string // Spécialisation du personnage
  role: string // Rôle (Tank, DPS, Healer)
  tete: EquipmentItem
  cou: EquipmentItem
  epaules: EquipmentItem
  cape: EquipmentItem
  torse: EquipmentItem
  poignets: EquipmentItem
  mains: EquipmentItem
  ceinture: EquipmentItem
  jambes: EquipmentItem
  pieds: EquipmentItem
  anneau1: EquipmentItem
  anneau2: EquipmentItem
  bijou1: EquipmentItem
  bijou2: EquipmentItem
  arme1: EquipmentItem
  arme2: EquipmentItem
  ilvl: number
  hasPermission: boolean
}

type BisItem = {
  slot: string
  name: string
  source: string
  ilvl: number
  itemId: string
  quality: "common" | "uncommon" | "rare" | "epic" | "legendary" | "artifact" | "bis-nm" | "bis-hm" | "bis-mm"
  notes?: string
}

// Ajouter les données initiales de secours près du début du fichier, juste après la définition des types
const initialEquipmentData: PlayerEquipment[] = [
  {
    id: 1,
    joueur: "DONNEES_SECOURS",
    classe: "PROBLEME_CHARGEMENT",
    specialisation: "NULL",
    role: "DPS",
    tete: {
      name: "NULL",
      color: "bg-gray-300",
      itemId: "0",
      quality: "common"
    },
    cou: {
      name: "NULL",
      color: "bg-gray-300",
      itemId: "0",
      quality: "common"
    },
    epaules: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    cape: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    torse: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    poignets: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    mains: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    ceinture: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    jambes: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    pieds: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    anneau1: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    anneau2: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    bijou1: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    bijou2: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    arme1: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    arme2: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    ilvl: 0,
    hasPermission: true
  },
  {
    id: 2,
    joueur: "CREER_FICHIER_DATA",
    classe: "DANS_DOSSIER_API",
    specialisation: "NULL",
    role: "Tank",
    tete: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    cou: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    epaules: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    cape: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    torse: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    poignets: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    mains: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    ceinture: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    jambes: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    pieds: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    anneau1: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    anneau2: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    bijou1: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    bijou2: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    arme1: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    arme2: {name: "NULL", color: "bg-gray-300", itemId: "0", quality: "common"},
    ilvl: 0,
    hasPermission: true
  }
]

// Ajouter après les déclarations de constantes existantes
// Mapping des classes avec leurs spécialisations
const classSpecializations: Record<string, string[]> = {
  "Guerrier": ["Armes", "Fureur", "Protection"],
  "Paladin": ["Sacré", "Protection", "Vindicte"],
  "Chasseur": ["Maîtrise des bêtes", "Précision", "Survie"],
  "Voleur": ["Assassinat", "Hors-la-loi", "Finesse"],
  "Prêtre": ["Discipline", "Sacré", "Ombre"],
  "Chaman": ["Élémentaire", "Amélioration", "Restauration"],
  "Mage": ["Arcane", "Feu", "Givre"],
  "Démoniste": ["Affliction", "Démonologie", "Destruction"],
  "Druide": ["Équilibre", "Farouche", "Gardien", "Restauration"],
  "Chevalier de la mort": ["Sang", "Givre", "Impie"],
  "Moine": ["Maître brasseur", "Tisse-brume", "Marche-vent"],
  "Chasseur de démons": ["Dévastation", "Vengeance"],
  "Évocateur": ["Dévastation", "Préservation"]
}

// Remplacer la fonction getQualityClass par celle-ci pour refléter les nouvelles couleurs
const getQualityClass = (quality: string): string => {
  switch (quality) {
    case "common":
      return "text-gray-200"
    case "uncommon":
      return "text-green-400"
    case "rare":
      return "text-blue-400"
    case "epic":
      return "text-purple-400"
    case "legendary":
      return "text-orange-400"
    case "artifact":
      return "text-red-400"
    case "bis-nm":
      return "text-blue-300" // bleu clair : bis nm
    case "bis-hm":
      return "text-yellow-300" // jaune : bis hm
    case "non-bis-hm":
      return "text-orange-400" // orange : loot non bis en hm
    case "bis-mm":
      return "text-purple-300" // violet clair : bis mm
    case "non-bis-mm":
      return "text-purple-500" // violet foncé : loot non bis en mm
    default:
      return "text-gray-200"
  }
}

// Fonction pour obtenir la couleur de fond basée sur la qualité
const getQualityBgClass = (quality: string): string => {
  switch (quality) {
    case "bis-nm":
      return "bg-blue-300/20"
    case "bis-hm":
      return "bg-yellow-300/20"
    case "non-bis-hm":
      return "bg-orange-400/20"
    case "bis-mm":
      return "bg-purple-300/20"
    case "non-bis-mm":
      return "bg-purple-500/20"
    case "common":
      return "bg-gray-200/20"
    default:
      return "bg-muted/20"
  }
}

// Fonction pour obtenir l'icône basée sur le type d'équipement
const getItemIcon = (slot: string) => {
  switch (slot.toLowerCase()) {
    case "tete":
      return <Gem className="h-4 w-4" />
    case "cou":
      return <Necklace className="h-4 w-4" />
    case "epaules":
      return <Shirt className="h-4 w-4" />
    case "cape":
      return <Scroll className="h-4 w-4" />
    case "torse":
      return <Shirt className="h-4 w-4" />
    case "poignets":
      return <Sparkles className="h-4 w-4" />
    case "mains":
      return <Sparkles className="h-4 w-4" />
    case "ceinture":
      return <Compass className="h-4 w-4" />
    case "jambes":
      return <Pants className="h-4 w-4" />
    case "pieds":
      return <Footprints className="h-4 w-4" />
    case "anneau 1":
    case "anneau 2":
    case "anneau1":
    case "anneau2":
      return <Ring className="h-4 w-4" />
    case "bijou 1":
    case "bijou 2":
    case "bijou1":
    case "bijou2":
      return <Gem className="h-4 w-4" />
    case "arme 1":
    case "arme1":
      return <Axe className="h-4 w-4" />
    case "arme 2":
    case "arme2":
      return <ShieldIcon className="h-4 w-4" />
    default:
      return <Flame className="h-4 w-4" />
  }
}

// Fonction pour générer un lien vers l'item réel
const getItemLink = (itemId: string) => {
  return `https://example-game.com/items/${itemId}`
}

// Fonction pour obtenir la couleur de classe WoW
const getClassColor = (classe: string): string => {
  switch (classe.toLowerCase()) {
    // Classes originales
    case "guerrier":
      return "text-amber-700" // #C79C6E
    case "paladin":
      return "text-pink-400" // #F58CBA
    case "chasseur":
      return "text-lime-400" // #ABD473
    case "voleur":
      return "text-yellow-300" // #FFF569
    case "prêtre":
      return "text-gray-100" // #FFFFFF
    case "chaman":
      return "text-blue-500" // #0070DE
    case "mage":
      return "text-sky-400" // #69CCF0
    case "démoniste":
      return "text-purple-400" // #9482C9
    case "druide":
      return "text-orange-500" // #FF7D0A
      
    // Classes ajoutées dans les extensions
    case "chevalier de la mort":
    case "dk":
      return "text-rose-600" // #C41E3A
    case "moine":
      return "text-emerald-400" // #00FF98
    case "chasseur de démons":
    case "dh":
      return "text-fuchsia-600" // #A330C9
    case "évocateur":
    case "evoker":
      return "text-teal-500" // #33937F
      
    // Version anglaise des noms de classes
    case "warrior":
      return "text-amber-700" // #C79C6E
    case "paladin":
      return "text-pink-400" // #F58CBA
    case "hunter":
      return "text-lime-400" // #ABD473
    case "rogue":
      return "text-yellow-300" // #FFF569
    case "priest":
      return "text-gray-100" // #FFFFFF
    case "shaman":
      return "text-blue-500" // #0070DE
    case "mage":
      return "text-sky-400" // #69CCF0
    case "warlock":
      return "text-purple-400" // #9482C9
    case "druid":
      return "text-orange-500" // #FF7D0A
    case "death knight":
      return "text-rose-600" // #C41E3A
    case "monk":
      return "text-emerald-400" // #00FF98
    case "demon hunter":
      return "text-fuchsia-600" // #A330C9
    case "evoker":
      return "text-teal-500" // #33937F
      
    default:
      return "text-muted-foreground"
  }
}

// Liste des qualités d'équipement disponibles
// Remplacer la définition incomplète des qualityOptions

// Liste des qualités d'équipement disponibles
const qualityOptions = [
  { value: "common", label: "Commun" },
  { value: "uncommon", label: "Inhabituel" },
  { value: "rare", label: "Rare" },
  { value: "epic", label: "Épique" },
  { value: "legendary", label: "Légendaire" },
  { value: "artifact", label: "Artefact" },
  { value: "bis-nm", label: "BiS NM" },
  { value: "bis-hm", label: "BiS HM" },
  { value: "non-bis-hm", label: "Non-BiS HM" },
  { value: "bis-mm", label: "BiS MM" },
  { value: "non-bis-mm", label: "Non-BiS MM" }
]

export default function EquipmentTable() {
  const [equipmentData, setEquipmentData] = useState<PlayerEquipment[]>([])
  const [bisItems, setBisItems] = useState<Record<string, BisItem[]>>({})
  const [editingBisItem, setEditingBisItem] = useState<{ playerId: number; index: number } | null>(null)
  const [showAddBisDialog, setShowAddBisDialog] = useState(false)
  const [newBisItem, setNewBisItem] = useState<Partial<BisItem>>({
    slot: "",
    name: "",
    source: "",
    ilvl: 650,
    itemId: "",
    quality: "epic"
  })
  const [activeBisPlayerId, setActiveBisPlayerId] = useState<number | null>(null)
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})
  const [editMode, setEditMode] = useState(false)
  const [showAddPlayerDialog, setShowAddPlayerDialog] = useState(false)
  const [newPlayer, setNewPlayer] = useState({
    joueur: "",
    classe: "",
    specialisation: "",
    role: "",
    ilvl: 650,
    hasPermission: true
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"full" | "compact">("compact")
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<string>("all") // "all", "bis-nm", "bis-hm", etc.
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  // Ajout des nouveaux filtres
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [classFilter, setClassFilter] = useState<string>("all")
  const [specFilter, setSpecFilter] = useState<string>("all")

  const { isAdmin } = useAuth()

  // Charger les données JSON
  useEffect(() => {
    const loadEquipmentData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/equipment-data')
        
        if (!response.ok) {
          throw new Error(`Erreur lors du chargement des données: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("Données d'équipement chargées:", data)
        
        // Vérifier que les données sont dans le format attendu
        if (data.players && Array.isArray(data.players) && data.players.length > 0) {
          setEquipmentData(data.players)
          
          // Convertir explicitement les IDs en strings pour les bisItems
          if (data.bisItems) {
            console.log("BiS items avant conversion:", data.bisItems)
            const formattedBisItems: Record<string, BisItem[]> = {};
            
            Object.entries(data.bisItems).forEach(([key, value]) => {
              formattedBisItems[String(key)] = value as BisItem[];
            });
            
            console.log("BiS items après conversion:", formattedBisItems)
            setBisItems(formattedBisItems)
          }
        } else {
          console.warn("Les données reçues ne sont pas valides:", data)
          setEquipmentData(initialEquipmentData)
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
        setError("Impossible de charger les données d'équipement. Veuillez réessayer plus tard.")
        setIsLoading(false)
        setEquipmentData(initialEquipmentData)
      }
    }

    loadEquipmentData()
  }, [])

  const toggleRow = (id: number) => {
    if (!equipmentData.find((player) => player.id === id)?.hasPermission && !!isAdmin) {
      return
    }

    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleViewMode = () => {
    const newViewMode = viewMode === "full" ? "compact" : "full"
    setViewMode(newViewMode)
  }

  const toggleBisEditMode = () => {
    setEditMode((prev) => !prev)
  }

  // Fonction pour ajouter un nouveau joueur
  const addNewPlayer = () => {
    if (!newPlayer.joueur) return

    // Créer un nouvel objet joueur avec des valeurs par défaut
    const defaultEquipment: EquipmentItem = {
      name: "x",
      color: "bg-gray-200",
      itemId: "0",
      quality: "common",
    }

    const newId = Math.max(...equipmentData.map((p) => p.id)) + 1

    const playerToAdd: PlayerEquipment = {
      id: newId,
      joueur: newPlayer.joueur,
      classe: newPlayer.classe || "",
      specialisation: newPlayer.specialisation || "",
      role: newPlayer.role || "",
      tete: defaultEquipment,
      cou: defaultEquipment,
      epaules: defaultEquipment,
      cape: defaultEquipment,
      torse: defaultEquipment,
      poignets: defaultEquipment,
      mains: defaultEquipment,
      ceinture: defaultEquipment,
      jambes: defaultEquipment,
      pieds: defaultEquipment,
      anneau1: defaultEquipment,
      anneau2: defaultEquipment,
      bijou1: defaultEquipment,
      bijou2: defaultEquipment,
      arme1: defaultEquipment,
      arme2: defaultEquipment,
      ilvl: newPlayer.ilvl || 650,
      hasPermission: true,
    }

    setEquipmentData((prev) => [...prev, playerToAdd])
    setShowAddPlayerDialog(false)
    setNewPlayer({
      joueur: "",
      classe: "",
      specialisation: "",
      role: "",
      ilvl: 650,
      hasPermission: true,
    })
  }

  // Fonction pour exporter les données
  const exportData = () => {
    const dataStr = JSON.stringify(equipmentData, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    const exportFileDefaultName = `equipment-export-${new Date().toISOString().slice(0, 10)}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // Filtrer les données en fonction de la recherche et du filtre
  const filteredData = useMemo(() => {
    return equipmentData.filter(player => {
      // Filtre de recherche
      if (searchQuery && !player.joueur.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Filtre par qualité d'équipement
      if (filter !== "all") {
        // Déterminer si le joueur a au moins un item de la qualité filtrée
        const hasQuality = Object.entries(player)
          .some(([key, value]) => {
            return typeof value === "object" && "quality" in value && value.quality === filter
          })
        
        if (!hasQuality) return false
      }

      // Filtre par rôle
      if (roleFilter !== "all" && player.role !== roleFilter) {
        return false
      }

      // Filtre par classe
      if (classFilter !== "all" && player.classe !== classFilter) {
        return false
      }

      // Filtre par spécialisation
      if (specFilter !== "all" && player.specialisation !== specFilter) {
        return false
      }
      
      return true
    })
  }, [equipmentData, searchQuery, filter, roleFilter, classFilter, specFilter])

  // Triez les données filtrées
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortOrder === "desc") {
        return b.ilvl - a.ilvl
      } else {
        return a.ilvl - b.ilvl
      }
    })
  }, [filteredData, sortOrder])

  // Calculer les statistiques globales
  const stats = useMemo(() => {
    // Utiliser sortedData au lieu de equipmentData pour que les stats reflètent les filtres
    const totalPlayers = sortedData.length
    const avgIlvl = totalPlayers ? 
      sortedData.reduce((sum, player) => sum + player.ilvl, 0) / totalPlayers : 0
    
    // Compter les occurrences de chaque qualité pour les joueurs filtrés
    const qualityCounts: Record<string, number> = {}
    sortedData.forEach(player => {
      Object.entries(player).forEach(([key, value]) => {
        if (typeof value === "object" && "quality" in value) {
          qualityCounts[value.quality] = (qualityCounts[value.quality] || 0) + 1
        }
      })
    })
    
    return {
      totalPlayers,
      avgIlvl: Math.round(avgIlvl * 10) / 10,
      qualityCounts
    }
  }, [sortedData]) // Changer la dépendance à sortedData au lieu de equipmentData

  // Mettre à jour la légende des couleurs en bas du tableau
  const renderColorLegend = () => {
    return (
      <div className="mt-4 text-sm text-muted-foreground bg-card p-4 rounded-md border border-border">
        <p>
          Cliquez sur une ligne pour voir l'équipement recommandé.{" "}
          {!!isAdmin && "Certaines lignes ne sont accessibles qu'aux utilisateurs avec les permissions appropriées."}
        </p>
        <p className="mt-2 flex flex-wrap gap-3">
          <span className="text-blue-300 font-medium flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-blue-300 rounded-sm"></span> BiS NM
          </span>
          <span className="text-yellow-300 font-medium flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-yellow-300 rounded-sm"></span> BiS HM
          </span>
          <span className="text-orange-400 font-medium flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-orange-400 rounded-sm"></span> Non-BiS HM
          </span>
          <span className="text-purple-300 font-medium flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-purple-300 rounded-sm"></span> BiS MM
          </span>
          <span className="text-purple-500 font-medium flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-purple-500 rounded-sm"></span> Non-BiS MM
          </span>
        </p>
      </div>
    )
  }

  // Move the isItemBiS function inside the component
  const isItemBiS = (playerId: number, slot: string, itemName: string): boolean => {
    const playerBisItems = bisItems[String(playerId)]
    if (!playerBisItems || playerBisItems.length === 0) return false
    
    // Convertir le nom de l'emplacement pour correspondre au format BiS
    const normalizedSlot = slot.toLowerCase()
    let bisSlot = ""
    
    if (normalizedSlot === "tête") bisSlot = "Tête"
    else if (normalizedSlot === "cou") bisSlot = "Cou"
    else if (normalizedSlot === "epaules") bisSlot = "Epaules"
    else if (normalizedSlot === "cape") bisSlot = "Cape"
    else if (normalizedSlot === "torse") bisSlot = "Torse"
    else if (normalizedSlot === "poignets") bisSlot = "Poignets"
    else if (normalizedSlot === "mains") bisSlot = "Mains"
    else if (normalizedSlot === "ceinture") bisSlot = "Ceinture"
    else if (normalizedSlot === "jambes") bisSlot = "Jambes"
    else if (normalizedSlot === "pieds") bisSlot = "Pieds"
    else if (normalizedSlot === "anneau1") bisSlot = "Anneau 1"
    else if (normalizedSlot === "anneau2") bisSlot = "Anneau 2"
    else if (normalizedSlot === "bijou1") bisSlot = "Bijou 1"
    else if (normalizedSlot === "bijou2") bisSlot = "Bijou 2"
    else if (normalizedSlot === "arme1") bisSlot = "Arme principale"
    else if (normalizedSlot === "arme2") bisSlot = "Arme secondaire"
    
    return playerBisItems.some(item => 
      item.slot.toLowerCase() === bisSlot.toLowerCase() && 
      item.name.toLowerCase() === itemName.toLowerCase()
    )
  }

  // Move the renderEquipmentCell function inside the component
  const renderEquipmentCell = (item: EquipmentItem, slot: string, playerId: number, equipType: string) => {
    // Classes pour mode compact/normal
    const cellPadding = viewMode === "compact" ? "p-1" : "p-2.5"
    const textSize = viewMode === "compact" ? "text-[10px]" : "text-sm"
    const iconSize = viewMode === "compact" ? "h-2.5 w-2.5" : "h-4 w-4"
    
    // Vérifier si cet item est dans la liste BiS du joueur
    const isBisItem = isItemBiS(playerId, slot, item.name)
    
    if (item.name === "x") {
      return (
        <TableCell
          className={cn("bg-background/20", "border border-border", cellPadding, viewMode === "compact" ? "w-[60px]" : "")}
        >
          <div className="flex items-center gap-1">
            {React.cloneElement(getItemIcon(slot), { className: iconSize })}
            <span className="whitespace-normal break-words">
              {item.name}
            </span>
          </div>
        </TableCell>
      )
    }

    // Traitement spécial pour les items "Set"
    if (item.name === "Set") {
      const setQualityClass = getQualityClass(item.quality)
      
      return (
        <TableCell
          className={cn(
            "border border-border",
            cellPadding,
            getQualityBgClass(item.quality),
            "relative",
            viewMode === "compact" ? "w-[70px]" : "",
            isBisItem ? "bis-item-cell" : ""
          )}
        >
          <div className="flex items-center">
            <div className={cn("flex items-center", setQualityClass, textSize)}>
              {React.cloneElement(getItemIcon(slot), { className: iconSize })}
              <span className="font-medium whitespace-normal break-words max-w-[80%]">
                {item.name}
              </span>
            </div>
            {isBisItem && (
              <Sparkles className={`${viewMode === "compact" ? "h-2 w-2" : "h-3 w-3"} text-yellow-400 ml-0.5 flex-shrink-0`} />
            )}
          </div>
          {isBisItem && <div className="absolute inset-0 bg-yellow-400/10 pointer-events-none" />}
        </TableCell>
      )
    }

    return (
      <TableCell
        className={cn(
          "bg-background/20", 
          getQualityBgClass(item.quality), 
          "border border-border", 
          cellPadding, 
          viewMode === "compact" ? "w-[80px]" : "", // Augmenté la largeur de 70 à 80px
          isBisItem ? "relative" : ""
        )}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-between w-full relative">
                <a
                  href={getItemLink(item.itemId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("flex items-center hover:underline", getQualityClass(item.quality), textSize)}
                >
                  {React.cloneElement(getItemIcon(slot), { className: iconSize })} 
                  <span className="whitespace-normal break-words max-w-[70%]">
                    {item.name}
                  </span>
                </a>
                {isBisItem && (
                  <Sparkles className={`${viewMode === "compact" ? "h-2 w-2" : "h-3 w-3"} text-yellow-400 flex-shrink-0`} />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="text-xs">
                <p className={cn("font-bold", getQualityClass(item.quality))}>
                  {item.name} {isBisItem && <span className="text-yellow-400">(BiS!)</span>}
                </p>
                <p>ID: {item.itemId}</p>
                {isBisItem && <p className="text-yellow-400 font-bold">✓ Item BiS obtenu!</p>}
                <p>Cliquez pour voir les détails</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {isBisItem && <div className="absolute inset-0 bg-yellow-400/10 pointer-events-none" />}
      </TableCell>
    )
  }

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des données d'équipement...</p>
        </div>
      </div>
    )
  }

  // Affichage en cas d'erreur
  if (error && equipmentData.length === 0) {
    return (
      <div className="bg-destructive/10 border border-destructive rounded-md p-4 my-4">
        <div className="flex items-start gap-3">
          <div className="text-destructive rounded-full bg-destructive/20 p-1">
            <X className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-destructive">Erreur de chargement</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
        <h2 className="text-xl font-semibold">Équipement des Joueurs</h2>
        
        <div className="flex flex-col sm:flex-row items-end gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <div className="flex items-center border rounded-md pl-3 pr-2 focus-within:ring-1 focus-within:ring-primary">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un joueur..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrer par qualité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les items</SelectItem>
                <SelectItem value="bis-nm">BiS NM</SelectItem>
                <SelectItem value="bis-hm">BiS HM</SelectItem>
                <SelectItem value="non-bis-hm">Non-BiS HM</SelectItem>
                <SelectItem value="bis-mm">BiS MM</SelectItem>
                <SelectItem value="non-bis-mm">Non-BiS MM</SelectItem>
                <SelectItem value="common">Commun</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Nouveaux contrôles de filtre */}
          <div className="w-full sm:w-auto">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="DPS" className="text-red-400">DPS</SelectItem>
                <SelectItem value="Tank" className="text-blue-400">Tank</SelectItem>
                <SelectItem value="Healer" className="text-green-400">Healer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrer par classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les classes</SelectItem>
                <SelectItem value="Guerrier" className="text-amber-700">Guerrier</SelectItem>
                <SelectItem value="Paladin" className="text-pink-400">Paladin</SelectItem>
                <SelectItem value="Chasseur" className="text-lime-400">Chasseur</SelectItem>
                <SelectItem value="Voleur" className="text-yellow-300">Voleur</SelectItem>
                <SelectItem value="Prêtre" className="text-gray-100">Prêtre</SelectItem>
                <SelectItem value="Chaman" className="text-blue-500">Chaman</SelectItem>
                <SelectItem value="Mage" className="text-sky-400">Mage</SelectItem>
                <SelectItem value="Démoniste" className="text-purple-400">Démoniste</SelectItem>
                <SelectItem value="Druide" className="text-orange-500">Druide</SelectItem>
                <SelectItem value="Chevalier de la mort" className="text-rose-600">Chevalier de la mort</SelectItem>
                <SelectItem value="Moine" className="text-emerald-400">Moine</SelectItem>
                <SelectItem value="Chasseur de démons" className="text-fuchsia-600">Chasseur de démons</SelectItem>
                <SelectItem value="Évocateur" className="text-teal-500">Évocateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Remplacer la div pour le filtre de spécialisation */}
          <div className="w-full sm:w-auto">
            <Select 
              value={specFilter}
              onValueChange={setSpecFilter}
              disabled={classFilter === "all"}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={classFilter === "all" ? "Choisissez d'abord une classe" : "Filtrer par spécialisation"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les spécialisations</SelectItem>
                {classFilter !== "all" && classSpecializations[classFilter]?.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mettre à jour la section des badges de filtre */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="text-xs">
          {sortedData.length} joueurs affichés
        </Badge>
        {searchQuery && (
          <Badge 
            variant="secondary" 
            className="text-xs group cursor-pointer"
            onClick={() => setSearchQuery("")}
          >
            Recherche: {searchQuery}
            <X className="ml-1 h-3 w-3 group-hover:text-destructive" />
          </Badge>
        )}
        {filter !== "all" && (
          <Badge 
            variant="secondary" 
            className="text-xs group cursor-pointer"
            onClick={() => setFilter("all")}
          >
            Filtre qualité: {qualityOptions.find(opt => opt.value === filter)?.label || filter}
            <X className="ml-1 h-3 w-3 group-hover:text-destructive" />
          </Badge>
        )}
        {roleFilter !== "all" && (
          <Badge 
            variant="secondary" 
            className={cn("text-xs group cursor-pointer", 
              roleFilter === "Tank" ? "text-blue-400" : 
              roleFilter === "Healer" ? "text-green-400" : 
              "text-red-400"
            )}
            onClick={() => setRoleFilter("all")}
          >
            Rôle: {roleFilter}
            <X className="ml-1 h-3 w-3 group-hover:text-destructive" />
          </Badge>
        )}
        {classFilter !== "all" && (
          <Badge 
            variant="secondary" 
            className={cn("text-xs group cursor-pointer", getClassColor(classFilter))}
            onClick={() => setClassFilter("all")}
          >
            Classe: {classFilter}
            <X className="ml-1 h-3 w-3 group-hover:text-destructive" />
          </Badge>
        )}
        {specFilter !== "all" && (
          <Badge 
            variant="secondary" 
            className="text-xs group cursor-pointer"
            onClick={() => setSpecFilter("all")}
          >
            Spécialisation: {specFilter}
            <X className="ml-1 h-3 w-3 group-hover:text-destructive" />
          </Badge>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={toggleViewMode}
            className="flex items-center gap-2"
          >
            {viewMode === "compact" ? (
              <>
                <Maximize2 className="h-4 w-4" />
                Vue Normale
              </>
            ) : (
              <>
                <Minimize2 className="h-4 w-4" />
                Vue Compacte
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={toggleBisEditMode}
            className="flex items-center gap-2"
          >
            {editMode ? (
              <>
                <X className="h-4 w-4" />
                Terminer édition BiS
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Éditer listes BiS
              </>
            )}
          </Button>

          <Button variant="outline" onClick={exportData} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="w-full overflow-x-auto border rounded-lg border-border">
        <Table className={viewMode === "compact" ? "table-fixed w-full text-[11px] min-w-[1200px]" : "min-w-[1200px]"}>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className={cn(viewMode === "compact" ? "w-6 p-1" : "w-10 p-2")}></TableHead>
              <TableHead className={viewMode === "compact" ? "p-1 w-[140px]" : "w-[240px]"}>
                <span className={viewMode === "compact" ? "text-xs" : ""}>Joueur</span>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Gem className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "T" : "Tête"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Necklace className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "C" : "Cou"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Shirt className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "E" : "Epaules"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Scroll className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "Cp" : "Cape"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Shirt className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "To" : "Torse"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Sparkles className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "Po" : "Poignets"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Sparkles className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "Ma" : "Mains"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Compass className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "Ce" : "Ceinture"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Pants className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "J" : "Jambes"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Footprints className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "Pi" : "Pieds"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Ring className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "A1" : "Anneau 1"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Ring className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "A2" : "Anneau 2"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Gem className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "B1" : "Bijou 1"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Gem className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "B2" : "Bijou 2"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <Axe className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "W1" : "Arme 1"}
                </div>
              </TableHead>
              <TableHead className={viewMode === "compact" ? "p-1" : ""}>
                <div className={cn("flex items-center gap-1", viewMode === "compact" ? "text-xs" : "")}>
                  <ShieldIcon className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> 
                  {viewMode === "compact" ? "W2" : "Arme 2"}
                </div>
              </TableHead>
              <TableHead 
                className={cn("text-right cursor-pointer", viewMode === "compact" ? "p-1" : "")}
                onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
              >
                <div className="flex items-center justify-end gap-1">
                  <span className={viewMode === "compact" ? "text-xs" : ""}>ilvl</span>
                  {sortOrder === "asc" ? 
                    <ArrowUp className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} /> : 
                    <ArrowDown className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} />
                  }
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((player) => (
              <React.Fragment key={player.id}>
                <TableRow
                  className={cn(
                    "cursor-pointer hover:bg-muted/50 transition-colors",
                    !player.hasPermission && !!isAdmin && "opacity-70 cursor-not-allowed",
                  )}
                  onClick={() => toggleRow(player.id)}
                >
                  <TableCell className={viewMode === "compact" ? "p-1" : ""}>
                    {(player.hasPermission || !isAdmin) &&
                      (expandedRows[player.id] ? (
                        <ChevronDown className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} />
                      ) : (
                        <ChevronRight className={viewMode === "compact" ? "h-3 w-3" : "h-4 w-4"} />
                      ))}
                  </TableCell>
                  <TableCell
                    className={cn("font-medium", viewMode === "compact" ? "p-1 text-xs" : "")}
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex items-center gap-1">
                        <span className={viewMode === "compact" ? "w-full break-words" : "w-full break-words"}>
                          {player.joueur}
                        </span>
                      </div>
                      <div className={cn(
                        "text-xs w-full", 
                        viewMode === "compact" ? "text-[10px] leading-tight" : ""
                      )}>
                        <span className={cn("break-words w-full", getClassColor(player.classe))}>
                          {player.classe}
                        </span>
                      </div>
                      {player.specialisation && (
                        <div className={cn(
                          "text-xs w-full", 
                          viewMode === "compact" ? "text-[10px] leading-tight" : ""
                        )}>
                          <span className="text-muted-foreground break-words w-full">
                            {player.specialisation}
                          </span>
                        </div>
                      )}
                      <div className={cn(
                        "text-xs font-medium w-full", 
                        viewMode === "compact" ? "text-[10px] leading-tight" : "",
                        player.role === "Tank" ? "text-blue-400" : 
                        player.role === "Healer" ? "text-green-400" : 
                        "text-red-400"
                      )}>
                        {player.role}
                      </div>
                    </div>
                  </TableCell>
                  {renderEquipmentCell(player.tete, "tete", player.id, "tete")}
                  {renderEquipmentCell(player.cou, "cou", player.id, "cou")}
                  {renderEquipmentCell(player.epaules, "epaules", player.id, "epaules")}
                  {renderEquipmentCell(player.cape, "cape", player.id, "cape")}
                  {renderEquipmentCell(player.torse, "torse", player.id, "torse")}
                  {renderEquipmentCell(player.poignets, "poignets", player.id, "poignets")}
                  {renderEquipmentCell(player.mains, "mains", player.id, "mains")}
                  {renderEquipmentCell(player.ceinture, "ceinture", player.id, "ceinture")}
                  {renderEquipmentCell(player.jambes, "jambes", player.id, "jambes")}
                  {renderEquipmentCell(player.pieds, "pieds", player.id, "pieds")}
                  {renderEquipmentCell(player.anneau1, "anneau1", player.id, "anneau1")}
                  {renderEquipmentCell(player.anneau2, "anneau2", player.id, "anneau2")}
                  {renderEquipmentCell(player.bijou1, "bijou1", player.id, "bijou1")}
                  {renderEquipmentCell(player.bijou2, "bijou2", player.id, "bijou2")}
                  {renderEquipmentCell(player.arme1, "arme1", player.id, "arme1")}
                  {renderEquipmentCell(player.arme2, "arme2", player.id, "arme2")}
                  <TableCell
                    className={cn("text-right font-bold", viewMode === "compact" ? "p-1 text-xs" : "")}
                  >
                    {player.ilvl}
                  </TableCell>
                </TableRow>

                {expandedRows[player.id] && (
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={19} className="p-4">
                      <div className="space-y-6">        
                          {/* BiS List Section */}
                          <div className="bg-card rounded-md p-4 shadow-sm border border-border">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-yellow-400" />
                                Liste Best-in-Slot de {player.joueur}
                              </h3>
                              
                              {/* Only show add button if not a default player */}
                              {player.id > 2 && !player.joueur.startsWith("DONNEES_") && !player.joueur.startsWith("CREER_") && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setActiveBisPlayerId(player.id)
                                    setShowAddBisDialog(true)
                                  }}
                                  className="flex items-center gap-1"
                                >
                                  <Plus className="h-4 w-4" /> Ajouter BiS
                                </Button>
                              )}
                            </div>
                          
                          {/* BiS items grid */}
                          {(() => {
                            const playerBisItems = bisItems[String(player.id)];
                            console.log(`Player ${player.id} BiS items:`, playerBisItems);
                            
                            return playerBisItems && playerBisItems.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {playerBisItems.map((item, index) => {
                                  // Vérifier si le joueur a déjà cet item équipé
                                  const hasItem = (() => {
                                    const slotName = item.slot.toLowerCase();
                                    let equipmentSlot = "";
                                    
                                    if (slotName.includes("tête")) equipmentSlot = "tete";
                                    else if (slotName.includes("cou")) equipmentSlot = "cou";
                                    else if (slotName.includes("epaules")) equipmentSlot = "epaules";
                                    else if (slotName.includes("cape")) equipmentSlot = "cape";
                                    else if (slotName.includes("torse")) equipmentSlot = "torse";
                                    else if (slotName.includes("poignets")) equipmentSlot = "poignets";
                                    else if (slotName.includes("mains")) equipmentSlot = "mains";
                                    else if (slotName.includes("ceinture")) equipmentSlot = "ceinture";
                                    else if (slotName.includes("jambes")) equipmentSlot = "jambes";
                                    else if (slotName.includes("pieds")) equipmentSlot = "pieds";
                                    else if (slotName.includes("anneau 1")) equipmentSlot = "anneau1";
                                    else if (slotName.includes("anneau 2")) equipmentSlot = "anneau2";
                                    else if (slotName.includes("bijou 1")) equipmentSlot = "bijou1";
                                    else if (slotName.includes("bijou 2")) equipmentSlot = "bijou2";
                                    else if (slotName.includes("arme principale")) equipmentSlot = "arme1";
                                    else if (slotName.includes("arme secondaire")) equipmentSlot = "arme2";
                                    
                                    if (!equipmentSlot) return false;
                                    
                                    const playerItem = player[equipmentSlot as keyof typeof player] as EquipmentItem;
                                    return playerItem && playerItem.name.toLowerCase() === item.name.toLowerCase();
                                  })();

                                  return (
                                    <div 
                                      key={index} 
                                      className={cn(
                                        "p-3 rounded-md border", 
                                        getQualityBgClass(item.quality),
                                        hasItem ? "border-yellow-400 relative" : ""
                                      )}
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="mb-1 flex items-center gap-1">
                                          {getItemIcon(item.slot)} {item.slot}
                                        </Badge>
                                        <div className="flex items-center gap-1">
                                          <Badge>{item.ilvl}</Badge>
                                          {hasItem && (
                                            <Badge className="bg-yellow-500/80 text-background">
                                              <Check className="h-3 w-3 mr-1" /> Obtenu
                                            </Badge>
                                          )}
                                          {editMode && (
                                            <Button 
                                              size="icon" 
                                              variant="ghost" 
                                              className="h-6 w-6 text-destructive opacity-80 hover:opacity-100"
                                              onClick={() => {
                                                // Remove this BiS item
                                                setBisItems(prev => {
                                                  const updated = { ...prev }
                                                  updated[player.id.toString()] = updated[player.id.toString()].filter((_, i) => i !== index)
                                                  return updated
                                                })
                                              }}
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <a
                                          href={getItemLink(item.itemId)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={cn("font-medium hover:underline truncate", getQualityClass(item.quality))}
                                        >
                                          {item.name}
                                        </a>
                                        {hasItem && (
                                          <Sparkles className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0" />
                                        )}
                                        {editMode && (
                                          <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-6 w-6 opacity-70 hover:opacity-100 ml-auto"
                                            onClick={() => {
                                              setEditingBisItem({ playerId: player.id, index })
                                              setActiveBisPlayerId(player.id)
                                              setNewBisItem(bisItems[player.id.toString()][index])
                                              setShowAddBisDialog(true)
                                            }}
                                          >
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                        )}
                                      </div>
                                      <p className="text-xs text-muted-foreground">{item.source}</p>
                                      {item.notes && (
                                        <p className="text-xs mt-1 italic text-muted-foreground">{item.notes}</p>
                                      )}
                                      {hasItem && (
                                        <div className="absolute inset-0 bg-yellow-400/5 pointer-events-none" />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="text-center p-6 text-muted-foreground">
                                <p>Aucun élément BiS enregistré.</p>
                                {editMode && player.id > 2 && !player.joueur.startsWith("DONNEES_") && !player.joueur.startsWith("CREER_") && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mt-2"
                                    onClick={() => {
                                      setActiveBisPlayerId(player.id)
                                      setShowAddBisDialog(true)
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-1" /> Ajouter
                                  </Button>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {renderColorLegend()}

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
          Statistiques
          {(searchQuery || filter !== "all" || roleFilter !== "all" || classFilter !== "all" || specFilter !== "all") && (
            <Badge variant="outline" className="text-xs">Filtré</Badge>
          )}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-card rounded-md border">
            <p className="text-sm text-muted-foreground">Nombre de joueurs</p>
            <p className="text-2xl font-bold">{stats.totalPlayers}</p>
          </div>
          <div className="p-3 bg-card rounded-md border">
            <p className="text-sm text-muted-foreground">ilvl moyen</p>
            <p className="text-2xl font-bold">{stats.avgIlvl}</p>
          </div>
          <div className="p-3 bg-card rounded-md border">
            <p className="text-sm text-muted-foreground">Items BiS</p>
            <p className="text-2xl font-bold">
              {(stats.qualityCounts["bis-nm"] || 0) + 
              (stats.qualityCounts["bis-hm"] || 0) + 
              (stats.qualityCounts["bis-mm"] || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Dialog pour ajouter un nouveau joueur */}
      <Dialog open={showAddPlayerDialog} onOpenChange={setShowAddPlayerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau joueur</DialogTitle>
            <DialogDescription>
              Entrez les informations du nouveau joueur. Vous pourrez modifier son équipement après l'avoir ajouté.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nom
              </label>
              <Input
                id="name"
                value={newPlayer.joueur}
                onChange={(e) => setNewPlayer({ ...newPlayer, joueur: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="classe" className="text-right">
                Classe
              </label>
              <Select 
                value={newPlayer.classe} 
                onValueChange={(value) => setNewPlayer({ ...newPlayer, classe: value })}
              >
                <SelectTrigger id="classe" className="col-span-3">
                  <SelectValue placeholder="Choisir une classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Guerrier" className="text-amber-700">Guerrier</SelectItem>
                  <SelectItem value="Paladin" className="text-pink-400">Paladin</SelectItem>
                  <SelectItem value="Chasseur" className="text-lime-400">Chasseur</SelectItem>
                  <SelectItem value="Voleur" className="text-yellow-300">Voleur</SelectItem>
                  <SelectItem value="Prêtre" className="text-gray-100">Prêtre</SelectItem>
                  <SelectItem value="Chaman" className="text-blue-500">Chaman</SelectItem>
                  <SelectItem value="Mage" className="text-sky-400">Mage</SelectItem>
                  <SelectItem value="Démoniste" className="text-purple-400">Démoniste</SelectItem>
                  <SelectItem value="Druide" className="text-orange-500">Druide</SelectItem>
                  <SelectItem value="Chevalier de la mort" className="text-rose-600">Chevalier de la mort</SelectItem>
                  <SelectItem value="Moine" className="text-emerald-400">Moine</SelectItem>
                  <SelectItem value="Chasseur de démons" className="text-fuchsia-600">Chasseur de démons</SelectItem>
                  <SelectItem value="Évocateur" className="text-teal-500">Évocateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="specialisation" className="text-right">
                Spécialisation
              </label>
              <Input
                id="specialisation"
                value={newPlayer.specialisation}
                onChange={(e) => setNewPlayer({ ...newPlayer, specialisation: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right">
                Rôle
              </label>
              <Select 
                value={newPlayer.role} 
                onValueChange={(value) => setNewPlayer({ ...newPlayer, role: value })}
              >
                <SelectTrigger id="role" className="col-span-3">
                  <SelectValue placeholder="Choisir un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DPS">DPS</SelectItem>
                  <SelectItem value="Tank">Tank</SelectItem>
                  <SelectItem value="Healer">Healer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="ilvl" className="text-right">
                Niveau d'objet
              </label>
              <Input
                id="ilvl"
                type="number"
                value={newPlayer.ilvl}
                onChange={(e) => setNewPlayer({ ...newPlayer, ilvl: Number.parseInt(e.target.value) || 650 })}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPlayerDialog(false)}>
              Annuler
            </Button>
            <Button onClick={addNewPlayer}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding/editing BiS items */}
      <Dialog open={showAddBisDialog} onOpenChange={setShowAddBisDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBisItem ? "Modifier l'élément BiS" : "Ajouter l'élément BiS"}
            </DialogTitle>
            <DialogDescription>
              {editingBisItem 
                ? "Modifiez les informations de l'élément BiS."
                : "Entrez les informations du nouvel élément BiS à ajouter à votre liste."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bis-slot" className="text-right">
                Emplacement
              </label>
              <Select 
                value={newBisItem.slot} 
                onValueChange={(value) => setNewBisItem({...newBisItem, slot: value})}
              >
                <SelectTrigger id="bis-slot" className="col-span-3">
                  <SelectValue placeholder="Choisir un emplacement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tête">Tête</SelectItem>
                  <SelectItem value="Cou">Cou</SelectItem>
                  <SelectItem value="Epaules">Epaules</SelectItem>
                  <SelectItem value="Cape">Cape</SelectItem>
                  <SelectItem value="Torse">Torse</SelectItem>
                  <SelectItem value="Poignets">Poignets</SelectItem>
                  <SelectItem value="Mains">Mains</SelectItem>
                  <SelectItem value="Ceinture">Ceinture</SelectItem>
                  <SelectItem value="Jambes">Jambes</SelectItem>
                  <SelectItem value="Pieds">Pieds</SelectItem>
                  <SelectItem value="Anneau 1">Anneau 1</SelectItem>
                  <SelectItem value="Anneau 2">Anneau 2</SelectItem>
                  <SelectItem value="Bijou 1">Bijou 1</SelectItem>
                  <SelectItem value="Bijou 2">Bijou 2</SelectItem>
                  <SelectItem value="Arme principale">Arme principale</SelectItem>
                  <SelectItem value="Arme secondaire">Arme secondaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bis-name" className="text-right">
                Nom de l'objet
              </label>
              <Input
                id="bis-name"
                value={newBisItem.name}
                onChange={(e) => setNewBisItem({...newBisItem, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bis-source" className="text-right">
                Source
              </label>
              <Input
                id="bis-source"
                value={newBisItem.source}
                onChange={(e) => setNewBisItem({...newBisItem, source: e.target.value})}
                className="col-span-3"
                placeholder="Ex: Raid, Donjon, Craft..."
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bis-ilvl" className="text-right">
                Niveau d'objet
              </label>
              <Input
                id="bis-ilvl"
                type="number"
                value={newBisItem.ilvl}
                onChange={(e) => setNewBisItem({...newBisItem, ilvl: Number(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bis-quality" className="text-right">
                Qualité
              </label>
              <Select 
                value={newBisItem.quality as string} 
                onValueChange={(value) => setNewBisItem({...newBisItem, quality: value as any})}
              >
                <SelectTrigger id="bis-quality" className="col-span-3">
                  <SelectValue placeholder="Choisir une qualité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bis-nm" className="text-blue-300">BiS NM</SelectItem>
                  <SelectItem value="bis-hm" className="text-yellow-300">BiS HM</SelectItem>
                  <SelectItem value="bis-mm" className="text-purple-300">BiS MM</SelectItem>
                  <SelectItem value="epic" className="text-purple-400">Épique</SelectItem>
                  <SelectItem value="legendary" className="text-orange-400">Légendaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bis-itemid" className="text-right">
                ID de l'objet
              </label>
              <Input
                id="bis-itemid"
                value={newBisItem.itemId}
                onChange={(e) => setNewBisItem({...newBisItem, itemId: e.target.value})}
                className="col-span-3"
                placeholder="ID pour le lien (optionnel)"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bis-notes" className="text-right">
                Notes
              </label>
              <Input
                id="bis-notes"
                value={newBisItem.notes || ""}
                onChange={(e) => setNewBisItem({...newBisItem, notes: e.target.value})}
                className="col-span-3"
                placeholder="Notes supplémentaires (optionnel)"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddBisDialog(false)
              setEditingBisItem(null)
              setNewBisItem({
                slot: "",
                name: "",
                source: "",
                ilvl: 650,
                itemId: "",
                quality: "epic"
              })
            }}>
              Annuler
            </Button>
            <Button onClick={() => {
              if (!newBisItem.slot || !newBisItem.name) return
              
              const bisItem: BisItem = {
                slot: newBisItem.slot,
                name: newBisItem.name,
                source: newBisItem.source || "",
                ilvl: newBisItem.ilvl || 650,
                itemId: newBisItem.itemId || "0",
                quality: newBisItem.quality as any || "epic",
                ...(newBisItem.notes && { notes: newBisItem.notes })
              }
              
              setBisItems(prev => {
                const updated = { ...prev }
                if (editingBisItem) {
                  // Update existing item
                  if (!updated[editingBisItem.playerId.toString()]) {
                    updated[editingBisItem.playerId.toString()] = []
                  }
                  updated[editingBisItem.playerId.toString()][editingBisItem.index] = bisItem
                } else if (activeBisPlayerId) {
                  // Add new item
                  if (!updated[activeBisPlayerId.toString()]) {
                    updated[activeBisPlayerId.toString()] = []
                  }
                  updated[activeBisPlayerId.toString()].push(bisItem)
                }
                return updated
              })
              
              setShowAddBisDialog(false)
              setEditingBisItem(null)
              setNewBisItem({
                slot: "",
                name: "",
                source: "",
                ilvl: 650,
                itemId: "",
                quality: "epic"
              })
            }}>
              {editingBisItem ? "Mettre à jour" : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

