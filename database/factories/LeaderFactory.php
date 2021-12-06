<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Leader;

class LeaderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Leader::class;

    public function definition()
    {
        return [
            'fname' => $this->faker->firstName(),
            'mname' => $this->faker->lastName,
            'lname' => $this->faker->lastName,
            'suffix' => $this->faker->suffix,
            'contact_no' => $this->faker->e164PhoneNumber,
            'precinct_no' => $this->faker->randomDigitNot(10),
            'address' => $this->faker->address,
        
        ];
    }
}
