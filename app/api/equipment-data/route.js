import { NextResponse } from 'next/server';
import { equipmentData} from './data.js';
import { bisItems } from './bisItems.js';

export async function GET() {
  try {
    return NextResponse.json({
      players: equipmentData,
      bisItems: bisItems || {}
    });
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    return NextResponse.json(
      { error: 'Impossible de charger les données' },
      { status: 500 }
    );
  }
}