package com.alanpugachev.ftespring.dtos

class CreateTaskDTO(
    val title: String,
    val projectCategory: String,
    val projectClass: String,
    val executionTime: String,
    val customer: String,
    val price: String
)