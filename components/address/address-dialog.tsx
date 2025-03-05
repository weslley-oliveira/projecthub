import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomerAddress } from "@/app/types/customer";
import { AddressForm } from "./address-form";

interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: CustomerAddress;
  onAddressChange: (address: CustomerAddress) => void;
  onSave: () => void;
}

export function AddressDialog({
  open,
  onOpenChange,
  address,
  onAddressChange,
  onSave,
}: AddressDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Address Information</DialogTitle>
          <DialogDescription>
            Fill in the address details
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <AddressForm address={address} onChange={onAddressChange} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Address</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 