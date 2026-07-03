import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'dummy_operations.csv');
    const fileContents = await fs.readFile(filePath, 'utf8');

    const lines = fileContents.trim().split('\n');
    const headers = lines[0].split(',');
    const records = lines.slice(1).map((line) => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim();
        return obj;
      }, {} as Record<string, string>);
    });

    return NextResponse.json({
      status: 'success',
      totalRecords: records.length,
      data: records,
    });
  } catch (error) {
    console.error('Failed to read dummy operations data:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}
