import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const ModalNouvelleReservation = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nouvelle Réservation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une réservation</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="Nom du client" />
          <Input type="date" />
          <Input placeholder="Numéro de chambre" />
          <Button>Confirmer</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}