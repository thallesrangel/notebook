<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Notebooks;

class NotebookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'My first book',
        ];

        foreach ($categories as $name) {
            Notebooks::create([
                'name' => $name,
                'slug' => Str::slug($name)
            ]);
        }
    }
}