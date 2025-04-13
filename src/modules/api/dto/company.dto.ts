export class CompanyDto {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logoUrl?: string; // Optional field for the company logo URL
  taxId?: string; // Optional field for the company tax ID
  registrationNumber?: string; // Optional field for the company registration number
}
