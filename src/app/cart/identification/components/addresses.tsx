"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import NewAddressForm from "./new-address-form";

const Addresses = () => {
  const [selectedAddress, setSelectedAdress] = useState<string | null>(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAdress}>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar Novo Endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress === "add_new" && <NewAddressForm />}
      </CardContent>
    </Card>
  );
};

export default Addresses;
