"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AddressData } from "@/app/types/project";

interface AddressProps {
  onAddressChange: (address: AddressData) => void;
  defaultValues?: AddressData;
  className?: string;
}

export function Address({ onAddressChange, defaultValues, className }: AddressProps) {
  const handleInputChange = (field: keyof AddressData, value: string) => {
    if (onAddressChange) {
      onAddressChange({
        street: field === 'street' ? value : defaultValues?.street || '',
        number: field === 'number' ? value : defaultValues?.number || '',
        complement: field === 'complement' ? value : defaultValues?.complement,
        neighborhood: field === 'neighborhood' ? value : defaultValues?.neighborhood || '',
        city: field === 'city' ? value : defaultValues?.city || '',
        state: field === 'state' ? value : defaultValues?.state || '',
        zipCode: field === 'zipCode' ? value : defaultValues?.zipCode || '',
        country: field === 'country' ? value : defaultValues?.country || '',
      });
    }
  };

  return (
    <div className={className}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="street">Rua</Label>
          <Input
            id="street"
            placeholder="Digite o nome da rua"
            defaultValue={defaultValues?.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="number">Número</Label>
            <Input
              id="number"
              placeholder="Nº"
              defaultValue={defaultValues?.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              placeholder="Apto, Sala, etc."
              defaultValue={defaultValues?.complement}
              onChange={(e) => handleInputChange('complement', e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            placeholder="Digite o bairro"
            defaultValue={defaultValues?.neighborhood}
            onChange={(e) => handleInputChange('neighborhood', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              placeholder="Digite a cidade"
              defaultValue={defaultValues?.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">Estado</Label>
            <Select
              defaultValue={defaultValues?.state}
              onValueChange={(value) => handleInputChange('state', value)}
            >
              <SelectTrigger id="state">
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AC">Acre</SelectItem>
                <SelectItem value="AL">Alagoas</SelectItem>
                <SelectItem value="AP">Amapá</SelectItem>
                <SelectItem value="AM">Amazonas</SelectItem>
                <SelectItem value="BA">Bahia</SelectItem>
                <SelectItem value="CE">Ceará</SelectItem>
                <SelectItem value="DF">Distrito Federal</SelectItem>
                <SelectItem value="ES">Espírito Santo</SelectItem>
                <SelectItem value="GO">Goiás</SelectItem>
                <SelectItem value="MA">Maranhão</SelectItem>
                <SelectItem value="MT">Mato Grosso</SelectItem>
                <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                <SelectItem value="MG">Minas Gerais</SelectItem>
                <SelectItem value="PA">Pará</SelectItem>
                <SelectItem value="PB">Paraíba</SelectItem>
                <SelectItem value="PR">Paraná</SelectItem>
                <SelectItem value="PE">Pernambuco</SelectItem>
                <SelectItem value="PI">Piauí</SelectItem>
                <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                <SelectItem value="RO">Rondônia</SelectItem>
                <SelectItem value="RR">Roraima</SelectItem>
                <SelectItem value="SC">Santa Catarina</SelectItem>
                <SelectItem value="SP">São Paulo</SelectItem>
                <SelectItem value="SE">Sergipe</SelectItem>
                <SelectItem value="TO">Tocantins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="zipCode">CEP</Label>
            <Input
              id="zipCode"
              placeholder="00000-000"
              defaultValue={defaultValues?.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              defaultValue={defaultValues?.country || "Brasil"}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}