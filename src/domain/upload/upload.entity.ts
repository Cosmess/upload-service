import { Datetime } from 'aws-sdk/clients/costoptimizationhub';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'upload' })
export class Upload {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  external_reference: string;

  @Column()
  type: string;

  @Column()
  filePath: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Adicionando createdAt com tipo timestamp
  createat: Datetime;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Adicionando createdAt com tipo timestamp
  updatedat: Datetime;

  constructor() {
    this.id = uuidv4(); // Gera um UUID automaticamente ao criar uma nova instância
    this.createat = new  Date();
    this.updatedat = new Date();
  }
}
