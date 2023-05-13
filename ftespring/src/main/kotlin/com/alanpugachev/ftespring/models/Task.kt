package com.alanpugachev.ftespring.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int = 0

    @Column
    var title = ""

    @Column
    var executionTime = ""

    @Column
    var customer = ""

    @Column
    var price = ""
}